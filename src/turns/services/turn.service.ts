import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turn } from '../entities/turn.entity';
import { Customer } from 'src/customers/entities/customers.entity';
import { users } from 'src/user/entities/users.entity';
import { CustomerService } from 'src/customers/services/customers.service';
import { Response } from 'src/enums/reponses';
import * as moment from 'moment-timezone';
require('dotenv').config();

@Injectable()
export class TurnService {
  TIME_APPOINTMENT = 20;
  private idUser;

  constructor(
    @InjectRepository(Turn) private turnRepo: Repository<Turn>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(users) private usersRepo: Repository<users>,
    private serviceCustomer: CustomerService
  ) {}

  async findAll() {
    return await this.turnRepo.find({ order: { order: 'ASC' } });
  }

  async getAllTurnCustomerByDay(id: string): Promise<Turn[]> {
    this.idUser = id;

    const currentDate = moment();
    const dateColombia = currentDate.tz('America/Bogota').startOf('day');

    const dateColombiaResult = new Date(dateColombia.year(), dateColombia.month(), dateColombia.date() );

    
    const endDate = moment(dateColombiaResult).endOf('day');

    const queryBuilder = this.turnRepo
      .createQueryBuilder('turn')
      .leftJoinAndSelect('turn.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.id_users = :id_users', {
        id_users: +id,
      })
      .andWhere('turn.disable = :disable', { disable: false })
      .andWhere(
        'turn.date_register >= :dateColombiaResult AND turn.date_register < :endDate',
        {
          dateColombiaResult,
          endDate,
        },
      )
      .orderBy('turn.order', 'ASC');
    return await queryBuilder.getMany();
  }

  async getAllTurnCustomerBySchedule(id: string, dateString: string): Promise<Turn[]> {

    const currentDate = moment(dateString);
    const dateColombia = currentDate.tz('America/Bogota').startOf('day');

    const dateColombiaResult = new Date(dateColombia.year(), dateColombia.month(), dateColombia.date() );

    const endDate = moment(dateColombiaResult).endOf('day');

    const queryBuilder = this.turnRepo
      .createQueryBuilder('turn')
      .leftJoinAndSelect('turn.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.id_users = :id_users', {
        id_users: +id,
      })
      .andWhere(
        'turn.date_register >= :dateColombiaResult AND turn.date_register < :endDate',
        {
          dateColombiaResult,
          endDate,
        },
      )
      .orderBy('turn.order', 'ASC');
    return await queryBuilder.getMany();
  }

  async findTurnById(id: number) {
    return await this.turnRepo.find({ where: { id } });
  }

  async orderCreate(body: any, newIndex: number) {
    try {
      let originalArray = body.turns;
      body.arrayOrder[newIndex].date_register =
        body.arrayOrder[newIndex + 1].date_register;
      const dateInitial = new Date(body.arrayOrder[newIndex].date_register);
      await this.update(
        body.arrayOrder[newIndex].id,
        body.arrayOrder[newIndex],
      );
      body.arrayOrder[newIndex].date_register = dateInitial;
      //this.notificationsService.sendEmail(body[newIndex], 'turnChange');
      let indexAdd = newIndex + 1;
      for (const turn of body.arrayOrder.slice(indexAdd)) {
        if (!turn.completed) {
          turn.date_register = originalArray[indexAdd].date_register;
        }
        //this.notificationsService.sendEmail(turn, 'turnChange');
        await this.update(turn.id, turn);
        indexAdd++;
      }
    } catch (error) {
      return {
        status: Response.ERROR,
        message: 'Error en el servidor',
      };
    }
    return {
      status: Response.SUCCESS,
      message: 'Has movido un turno',
    };
  }

  async create(body: Turn, method: string) {
    let customer = null;
    try {
      const turns: Turn[] = await this.getAllTurnCustomerByDay(this.idUser);
      if (turns.length === 0) {
        customer = await this.responseCustomer(body, method);
        body.order = 1;
        if (body.date_register_string) {
          body.date_register = this.managerDateString(
            body.date_register_string,
          );
          const turn = new Turn();
          turn.completed = false;
          turn.isSchedule = false;
          turn.order = body.order;
          turn.price = body.price;
          turn.date_register = body.date_register;
          turn.customer = customer;
          await this.turnRepo.save(turn);
        }
      } else {
        let findTurn = turns.find((turn) => {
          let turnDate = new Date(turn.date_register);
          let turnDateNew = new Date(
            this.managerDateString(body.date_register_string),
          );
          return turnDate.getTime() === turnDateNew.getTime() && !turn.completed;
        });
        if (!findTurn) {
          let position = turns.findIndex((turn) => {
            let turnDate = new Date(turn.date_register);
            let turnDateNew = new Date(
              this.managerDateString(body.date_register_string),
            );
            return turnDate >= turnDateNew;
          });
          if (position === -1) {
            position = turns.length;
          }
          for (const turn of turns) {
            await this.turnRepo.delete(turn.id);
          }
          turns.splice(position, 0, body);
          let count = 0;
          for (const turn of turns) {
            customer = await this.responseCustomer(turn, method);
            const turnNew = new Turn();
            turnNew.completed = turn.completed;
            turnNew.order = count + 1;
            turnNew.date_register = turn.date_register_string
              ? this.managerDateString(turn.date_register_string)
              : turn.date_register;
            turnNew.price = turn.price;
            turnNew.customer = customer;
            await this.turnRepo.save(turnNew);
            count++;
          }
        } else {
          return {
            status: Response.SAME_HOUR,
            message: 'Ya existe un turno asignado a la misma hora',
          };
        }
      }
    } catch (error) {
      return {
        status: Response.ERROR,
        message: 'error server',
      };
    }
    return {
      status: Response.SUCCESS,
      message: 'Agregaste un turno',
    };
  }

  private managerDateString(dateString: string) {
    const arrayTime = dateString.split(':');
    const numbersTime = arrayTime.map((valor) => Number(valor));
    return this.addHourAnddMinutes(numbersTime[0], numbersTime[1]);
  }

  private addHourAnddMinutes(hour, minutes) {
    const serverDate = moment();
    const dateColombia = serverDate.tz('America/Bogota');
    const result = new Date(dateColombia.year(), dateColombia.month(), dateColombia.date() );

    result.setHours(0, 0, 0, 0);
    result.setHours(hour);
    result.setMinutes(minutes);
    return result;
  }

  private async responseCustomer(body: Turn, method: string) {
    switch (method) {
      case 'turn':
        return await this.serviceCustomer.findCustomerPhone(
          body.customer.phone,
        );
      case 'turnCustomerSchedule':
        return await this.serviceCustomer.findCustomerPhone(
          body.customer.phone,
        );
    }
  }

  async update(id: any, body: any) {
    const [originalTurn] = await this.findTurnById(id);
    originalTurn.order = body.order;
    originalTurn.date_register = body.date_register;
    return this.turnRepo.save(originalTurn);
  }
  async updateTurn(id: any, body: Turn) {
    try {
      const bodyUpdate = {
        date_register: this.managerDateString(body.date_register_string),
        price: body.price,
      };
      await this.turnRepo.update(id, bodyUpdate);
    } catch (error) {
      return {
        status: Response.ERROR,
        message: 'error server',
      };
    }
    return {
      status: Response.SUCCESS,
      message: 'Editaste un turno',
    };
  }

  async updateTurnStatus(idStatus: string, body: any) {
    const id = idStatus;
    return await this.turnRepo.update(id, body);
  }

  async disable(id: number) {
    let count = 1;
    const turnsIniitial = await this.getAllTurnCustomerByDay(this.idUser);
    const deleteTurn = turnsIniitial.find((element) => element.id === id);
    //this.notificationsService.sendEmail(deleteTurn, 'deleteTurnNotification');
    var posicionDeleteTurn = turnsIniitial.indexOf(deleteTurn);
    const bodyUpdate = {
      disable: true,
    };
    await this.turnRepo.update(id, bodyUpdate);
    const turns = await this.getAllTurnCustomerByDay(this.idUser);
    if (turns.length > 0) {
      for (const turn of turns) {
        turn.order = count++;
      }
      for (const turn of turns.slice(posicionDeleteTurn)) {
        //this.notificationsService.sendEmail(turn, 'deleteTurn');
        await this.update(turn.id, turn);
        posicionDeleteTurn++;
      }
    }
    return true;
  }

  async postpone(body: Turn[]) {
    try {
      for (const turn of body) {
        turn.date_register = new Date(turn.date_register);
        turn.date_register.setMinutes(turn.date_register.getMinutes() + 10);
        //this.notificationsService.sendEmail(turn, 'turnPostpone');
        //this.notificationsService.sendtxt(turn, 'turnPostpone');
        await this.update(turn.id, turn);
      }
    } catch (error) {
      return {
        status: Response.ERROR,
        message: 'Error en el servidor',
      };
    }
    return {
      status: Response.SUCCESS,
      message: 'Haz aplazado todos los turnos 10 minutos',
    };
  }
}
