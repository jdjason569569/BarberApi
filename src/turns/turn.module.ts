import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entities/turn.entity';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { Customer } from 'src/customers/entities/customers.entity';
import { CustomerService } from 'src/customers/services/customers.service';
import { users } from 'src/user/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Turn, Customer, users]),
    
  ],
  providers: [TurnService, CustomerService],
  controllers: [TurnController]
})
export class TurnModule {}
