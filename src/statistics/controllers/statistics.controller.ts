import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';

  
  
  @Controller('api/statistics')
  export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @Get('profitDay')
    profitDay() {
      return this.statisticsService.profitDay();
    }
  
    @Get('usertime/:idUser')
    getUserTime(@Param('idUser') idUser: string) {
      return this.statisticsService.getUserTime(idUser);
    }

    @Get('totalPay/:idUser')
    getTotalPay(@Param('idUser') idUser: string) {
      return this.statisticsService.getTotalPay(idUser);
    }

    @Get('customerGoes/:idUser/:idMonth')
    getCustomerGoes(@Param('idUser') idUser: string, @Param('idMonth') customerGoesMonth: string) {
      return this.statisticsService.getCustomerGoes(idUser, customerGoesMonth);
    }

    @Get('bestDay/:idUser/:idMonth')
    getBestDay(@Param('idUser') idUser: string, @Param('idMonth') customerGoesMonth: string) {
      return this.statisticsService.getBestDay(idUser, customerGoesMonth);
    }

    @Get('moneyByDay/:idUser')
    moneyByDay(@Param('idUser') idUser: string) {
      return this.statisticsService.moneyByDay(idUser);
    }

    @Get('moneyByDaySchedule/:idUser/:startDate')
    moneyByDaySchedule(@Param('idUser') idUser: string, @Param('startDate') startDate: string) {
      return this.statisticsService.moneyByDaySchedule(idUser, startDate);
    }

    @Get('moneyAllDaySchedule/:idUser')
    moneyAllDaySchedule(@Param('idUser') idUser: string) {
      return this.statisticsService.moneyAllDaySchedule(idUser);
    }
  
    
  }
  