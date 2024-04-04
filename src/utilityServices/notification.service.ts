import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Turn } from 'src/turns/entities/turn.entity';
import { TypeMessage } from 'src/enums/typeMessage';

@Injectable()
export class NotificationService {
  // private readonly client: Twilio.Twilio;
  accountSid = 'AC8a11e561b275ff67e118315eb39a26ce';
  authToken = '2bb077e3465112da83d73347152ba31a';
  constructor(private readonly mailerService: MailerService) {}

  // buildMessage = (turn: Turn, reason: string): string => {
  //   let reasonText = '';
  //   switch (reason) {
  //     case TypeMessage.new:
  //       reasonText = `Se te ha asignado un turno a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, por favor espera notificaciones`;
  //       break;
  //     case TypeMessage.turnChange:
  //     case TypeMessage.deleteTurn:
  //       reasonText = `Se ha cambiado tu turno a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, tu turno es ${
  //         turn.order
  //       }, por favor espera notificaciones`;
  //       break;
  //     case TypeMessage.turnPostpone:
  //       reasonText = `Se ha corrido tu turno 10 minutos  ahora es a las ${turn.date_register.getHours()}: ${turn.date_register.getMinutes()}, tu turno es ${
  //         turn.order
  //       }, por favor espera notificaciones`;
  //       break;
  //     case TypeMessage.deleteTurnNotification:
  //       reasonText = `Tu turno ha sido eliminado!!`;
  //       break;
  //   }
  //   return reasonText;
  // };

  async sendEmail(message, sub) {
    //turn: Turn, reason: string
    //this.buildMessage(turn, reason);
    const emails = ['andy18larevolucion@gmail.com ','jdjason569@gmail.com']
    if (message !== '') {
      this.mailerService.sendMail({
        to: emails.join(','),
        from: 'jdjason569develop@gmail.com',
        subject: sub,
        text: message,
      });
    }
  }

  sendWhatsapp = async (turn: Turn, reason: string) => {
    //const message = this.buildMessage(turn, reason);
    //   await this.client.messages.create({
    //     body: 'hola te envio un mensaje desde api barber',
    //     from: 'whatsapp:+14155238886',
    //     to: 'whatsapp:+573233494728',
    //   });
    // };
    // sendtxt = async (turn: Turn, reason: string) => {
    //   const message = this.buildMessage(turn, reason);
    //   this.client.messages
    //     .create({
    //       body: message,
    //       to: '+573161278233',  // this phone number is dinamic
    //       from: '+12569077284',
    //     })
    //     .then((msg) => console.log(msg.sid));
    // };
  };
}
