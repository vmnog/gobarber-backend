import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expressHandlebars from 'express-handlebars';
import nodemailerHandlebars from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null // se o serviço de email nao pedir authorizacao ele passa null
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // configurando como vão ser compilados os emails antes do envio
    this.transporter.use(
      'compile',
      nodemailerHandlebars({
        viewEngine: expressHandlebars.create({
          // configurando as pastas onde vao ficar os templates de email
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default' // ~/app/views/emails/layouts/default.hbs
          // extname: '.hbs' // qual estensão estamos usando [.hbs  /  .handlebars]
        }),
        viewPath
        // extname: '.hbs'
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();
