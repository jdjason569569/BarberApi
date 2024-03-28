import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config) private configRepo: Repository<Config>,
  ) {}


  

  
}
