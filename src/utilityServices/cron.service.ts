import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Injectable()
export class CronSchedule {
  constructor(private notificationsService: NotificationService) {}

  @Cron('59 11 * * *')
  sendEmailPerDay2() {
    console.log("11 59 am")
    //this.notificationsService.sendEmail("message for test");
  }

  @Cron('58 8 * * *')
  sendEmailPerDay3() {
    console.log("58 8")
    //this.notificationsService.sendEmail("message for test");
  }

  @Cron('58 9 * * *')
  sendEmailPerDay4() {
    console.log("58 9")
    //this.notificationsService.sendEmail("message for test");
  }
}
