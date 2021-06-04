import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
@Injectable()
export class Email {
  constructor() { }

  async sendEmail(email, message, type, userName) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.EMAIL_PASSWORD),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var mailOptions;
    if (type === 'confirm') {
      mailOptions = {
        from: '"Marakby list Contact" <' + String(process.env.EMAIL) + '>',
        to: email,
        subject: '👋  confirm your email',
        html:
          '<html><h1>  Hi,' +
          userName +
          ' 😊 </h1> <p> now you are an user in Marakby list </p>  </html>',
      };
    } else if (type === 'Delete account') {
      mailOptions = {
        from: '"Marakby list Contact" <' + String(process.env.EMAIL) + '>',
        to: email,
        subject: '😔 Sure delete account ',
        html:
          '<html><h1>  Hi,' +
          userName +
          '  </h1> <p>Really, We are very sad because you will leave us </p> <p>We have been very happy with you </p> <p>follow this link  and return to us  <p></p> <h2> <a href=http://localhost:8080" target ="_blank">phantom</a></h2></html>',
      };
    }
    transporter.sendMail(mailOptions);
    return 1;
  }
}
