import path from 'path';

import nodemailer from 'nodemailer';

import keys from '../config/keys';

import logger from '../config/logger';

const fs = require('fs').promises;

const getEmailTemplate = async (content, templateName) => {
  try {
    if (
      content === undefined ||
      content === null ||
      content === '' ||
      typeof content !== 'string'
    )
      throw new Error('Content must not be empty');

    const filename = path.join(__dirname, `/template/${templateName}.html`);
    let emailBody = await fs.readFile(filename, 'utf-8');

    emailBody = emailBody.replace('{%content%}', content);
    return emailBody;
  } catch (error) {
    logger.info('ERROR FROM getEmailTemplate');
    throw error;
  }
};

const sendMail = async (emailTo, subject, body, attachments = []) => {
  try {
    const testAccound =
      keys.env === 'development' ? await nodemailer.createTestAccount() : null;

    const transport = await nodemailer.createTransport({
      host: keys.emailHost || 'smtp.ethereal.email',
      port: keys.emailPort || 587,
      secure: keys.emailSecure || false,
      auth: {
        user: keys.emailUser || testAccound.user,
        pass: keys.passwordemailUser || testAccound.pass
      }
    });

    const mailOptions = {
      from: keys.emailUser || 'toto@example.com',
      to: emailTo,
      subject,
      html: body,
      attachments
    };

    const info = await transport.sendMail(mailOptions);

    logger.info(`Message sent: ${info.messageId}`);

    if (testAccound !== null)
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    logger.info('ERROR FROM Send Mail');
    logger.error(error);
    throw error;
  }
};

export { getEmailTemplate, sendMail };
