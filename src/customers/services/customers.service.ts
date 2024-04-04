import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customers.entity';
import { Response } from 'src/enums/reponses';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}

  async findAll(id: string) {
    return this.customerRepo.find({
      where: {
        disable: false,
        user: {
          id_users: +id,
        },
        fast_customer : false
      },
    });
  }

  async findCustomerPhone(phone: string): Promise<Customer> {
    return await this.customerRepo.findOne({ where: { phone } });
  }

  async findUser(id: string): Promise<Customer> {
    return await this.customerRepo.findOne({ where: { id_customer: +id } });
  }

  async create(body: Customer, isFastCustomer: boolean) {
    try {
      const existCustomer = await this.findCustomerPhone(body.phone);
      if (!existCustomer || isFastCustomer) {
        return await this.customerRepo.save(this.customerRepo.create(body));
      } else {
        return {
          status: Response.ERROR,
          message: 'Ya existe un cliente con el numero telefonico',
        };
      }
    } catch (error) {
      return {
        status: Response.ERROR,
        message: 'Error',
      };
    }
  }

  async update(id: number, body: Customer) {
    const id_customer = id;
    return await this.customerRepo.update(id_customer.toString(), body);
  }

  async disable(id: number, body: Customer) {
    const id_customer = id;
    body.disable = true;
    return await this.customerRepo.update(id_customer.toString(), body);
  }

  async delete(id: number) {
    try {
      await this.customerRepo.delete(id);
      return true;
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  }
}
