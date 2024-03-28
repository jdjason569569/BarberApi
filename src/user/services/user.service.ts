import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../entities/users.entity';
import { Config } from 'src/config/entities/config.entity';
import { Response } from 'src/enums/reponses';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(users) private userRepo: Repository<users>,
    @InjectRepository(Config) private configRepo: Repository<Config>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findUser(id: string): Promise<users> {
    return await this.userRepo.findOne({ where: { id_firebase: id } });
  }

  async create(body: users) {
    let responseConfig = null;
    const response = await this.userRepo.save(this.userRepo.create(body));
    if (response) {
      const config = new Config();
      config.sessions = body.config.sessions;
      const user = new users();
      user.id_users = response.id_users;
      config.users = user;
      responseConfig = this.configRepo.save(this.configRepo.create(config));
    }
    return responseConfig;
  }

  async update(id: number, body: any) {
    
    const user = await this.userRepo.findOne({ where: { id_users: id } });
    let numberSession = 0;
    if (body.increaseVar) {
      const config = await this.configRepo.findOne({
        where: { users: { id_users: +id } },
      });
      if (user.active_sessions < config.sessions) {
        numberSession = ++user.active_sessions;
      } else {
        console.log("no tiene sessiones activas")
        return {
          status: Response.ERROR,
          message: 'No tienes mas sessiones activas',
        };
      }
    } else {
      numberSession = --user.active_sessions;
    }
    return this.userRepo.update(id, { active_sessions: numberSession });
  }

  async delete(id: number) {
    await this.userRepo.delete(id);
    return true;
  }
}
