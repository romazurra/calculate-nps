import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";

class SendMailService {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFile = fs.readFileSync(path).toString("utf-8");

    const mailTemplate = handlebars.compile(templateFile);

    const html = mailTemplate(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <no-reply@nps.com.br>",
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
