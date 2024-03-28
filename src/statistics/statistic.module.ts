import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './controllers/statistics.controller';
import { Turn } from 'src/turns/entities/turn.entity';
import { Customer } from 'src/customers/entities/customers.entity';
import { DbConnectionService } from 'src/utilityServices/dbConnectionService';
import { NotificationService } from 'src/utilityServices/notification.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Turn, Customer])  
      ],
      providers: [StatisticsService, DbConnectionService, NotificationService],
      controllers: [StatisticsController]
})
export class StatisticsModule {}
