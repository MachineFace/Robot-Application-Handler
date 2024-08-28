/**
 * -----------------------------------------------------------------------------------------------------------------
 * Send an Email
 * @required {string} Student Email
 * @required {string} Status
 */
class Emailer {
  constructor({ 
    name : name = `Unknown Name`, 
    status : status = STATUS.received,
    email : email = `Unknown Email`,    
    designspecialistemail : designspecialistemail = SERVICE_EMAIL,
    message : message = ``,
  }) {
    /** @private */
    this.name = name;
    /** @private */
    this.status = status;
    /** @private */
    this.email = email;
    /** @private */
    this.designspecialistemail = designspecialistemail;
    /** @private */
    this.message = message instanceof CreateMessage ? message : new CreateMessage({ name : this.name,  });

    this.SendEmail();
  }

  // Send email with appropriate response
  SendEmail () {
    try {
      switch(this.status) {
        case STATUS.received:
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Application Received`, '', {
            htmlBody : this.message.receivedMessage, 
            from : SERVICE_EMAIL, 
            bcc : SERVICE_EMAIL,
            name : SERVICE_NAME,
          });
          Log.Warning(`Student: ${this.name} has been emailed ${STATUS.received} message.`);
          break;
        case STATUS.accepted:
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Application Accepted`, '', {
            htmlBody : this.message.acceptedMessage, 
            from : SERVICE_EMAIL, 
            bcc : SERVICE_EMAIL,
            name : SERVICE_NAME,
          });
          Log.Warning(`Student: ${this.name} has been emailed ${STATUS.accepted} message.`);
          break;
        case STATUS.rejected:
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Application Declined`, '', {
            htmlBody : this.message.rejectedMessage, 
            from : SERVICE_EMAIL, 
            bcc : SERVICE_EMAIL,
            name : SERVICE_NAME,
          });
          Log.Warning(`Student: ${this.name} has been emailed ${STATUS.rejected} message.`);
          break; 
        case "":
        case undefined:
          break;
      }
      return 0;
    } catch(err) {
      console.error(`"SendEmail()" failed: ${err}`);
      return 1;
    }

  }
}


/**
 * Send an email
 */
const SendEmail = ({
  email : email = SERVICE_EMAIL,
  staffEmail : staffEmail = SERVICE_EMAIL,
  status : status = `Default`,
  message : message = new CreateMessage(),
}) => {
  try {
    MailApp.sendEmail(email, `${SERVICE_NAME} : ${status}`, ``, {
      htmlBody: message,
      from: SERVICE_EMAIL,
      cc: staffEmail,
      name: SERVICE_NAME,
    });
    Log.Warning(`"${status}" Email sent to student and status set to "${status}".`);
    return 0;
  } catch (err) {
    console.error(`Could not email: ${err}`);
    return 1;
  }
}










