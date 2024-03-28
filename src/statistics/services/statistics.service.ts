import { Injectable } from '@nestjs/common';
import { DbConnectionService } from 'src/utilityServices/dbConnectionService';
import {
  COUNT_TURNS_BY_CUSTOMER,
  TOTAL_PAY,
  CUSTOMER_GOES,
  BEST_DAY,
  TEST,
  MONEY_BY_DAY,
  MONEY_ALL_DAY,
} from 'src/utilityServices/sql';
import * as moment from 'moment-timezone';
import { NotificationService } from 'src/utilityServices/notification.service';

@Injectable()
export class StatisticsService {
  constructor(
    private dbConnection: DbConnectionService,
    private notificationsService: NotificationService,
  ) {}

  async profitDay() {
    const result = await this.moneyByDay('5');
    this.notificationsService.sendEmail(`Hoy ganaste ${result} $`);
    return {};
  }

  async getUserTime(idUser: string): Promise<any> {
    try {
      return await this.dbConnection.query(COUNT_TURNS_BY_CUSTOMER, [+idUser]);
    } catch (error) {
      throw error;
    }
  }

  async getTotalPay(idUser: string): Promise<any> {
    try {
      return await this.dbConnection.query(TOTAL_PAY, [+idUser]);
    } catch (error) {
      throw error;
    }
  }

  async getCustomerGoes(
    idUser: string,
    customerGoesMonth: string,
  ): Promise<any> {
    try {
      return await this.dbConnection.query(CUSTOMER_GOES, [
        +customerGoesMonth,
        +idUser,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getBestDay(idUser: string, customerGoesMonth: string): Promise<any> {
    try {
      return await this.dbConnection.query(BEST_DAY, [
        +customerGoesMonth,
        +idUser,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async moneyByDay(idUser: string): Promise<any> {
    try {
      const serverDate = moment();
      const dateColombia = serverDate.tz('America/Bogota');
      const date = new Date(
        dateColombia.year(),
        dateColombia.month(),
        dateColombia.date(),
      );
      return await this.dbConnection.query(MONEY_BY_DAY, [date, +idUser]);
    } catch (error) {
      throw error;
    }
  }

  async moneyByDaySchedule(idUser: string, dateString: string): Promise<any> {
    try {
      const serverDate = moment(dateString);
      const dateColombia = serverDate.tz('America/Bogota');
      const date = new Date(
        dateColombia.year(),
        dateColombia.month(),
        dateColombia.date(),
      );
      return await this.dbConnection.query(MONEY_BY_DAY, [date, +idUser]);
    } catch (error) {
      throw error;
    }
  }

  async moneyAllDaySchedule(idUser: string): Promise<any> {
    try {
      return await this.dbConnection.query(MONEY_ALL_DAY, [+idUser]);
    } catch (error) {
      throw error;
    }
  }
}
