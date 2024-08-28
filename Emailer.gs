/**
 * -----------------------------------------------------------------------------------------------------------------
 * Send an Email
 * @required {string} Student Email
 * @required {string} Status
 */
class Emailer
{
  constructor({ 
    name : name = `Unknown Name`, 
    status : status = STATUS.received,
    email : email = `Unknown Email`,    
    designspecialistemail : designspecialistemail = SERVICE_EMAIL,
    message : message = ``,
  }) {
    this.name = name;
    this.status = status;
    this.email = email;
    this.designspecialistemail = designspecialistemail;
    this.message = message instanceof CreateMessage ? message : new CreateMessage({ name : this.name });

    this.SendEmail();
  }

  SendEmail () {
    const staff = BuildStaff();
    try {
      switch (this.status) {
        case STATUS.received:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : ${STATUS.received}`, "", {
            htmlBody: this.message.receivedMessage,
            from: SERVICE_EMAIL,
            cc: this.designspecialistemail,
            bcc: staff.Chris.email,
            name: SERVICE_NAME,
          });
          break;
        case STATUS.inProgress:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project Started`, "", {
              htmlBody: this.message.inProgressMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.completed:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project Completed`, "", {
              htmlBody: this.message.completedMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.abandoned:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project waiting for you to pick up!`, "", {
              htmlBody: this.message.abandonedMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.pickedUp:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project Picked Up`, "", {
              htmlBody: this.message.pickedUpMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.failed:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project has Failed`, "", {
              htmlBody: this.message.failedMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.rejectedByStudent:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project has been Declined`, "", {
              htmlBody: this.message.rejectedByStudentMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.rejectedByStaff:
        case STATUS.cancelled:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project has been Cancelled`, "", {
              htmlBody: this.message.rejectedByStaffMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.billed:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project Closed`, "", {
            htmlBody: this.message.billedMessage,
            from: SERVICE_EMAIL,
            cc: this.designspecialistemail,
            bcc: staff.Chris.email,
            name: SERVICE_NAME,
          });
          break;
        case STATUS.waitlist:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Project Waitlisted`, "", {
              htmlBody: this.message.waitlistMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
          break;
        case STATUS.missingAccess:
          console.warn(`Sending ${this.status} email to student.`);
          MailApp.sendEmail(this.email, `${SERVICE_NAME} : Missing Access`, "", {
              htmlBody: this.message.noAccessMessage,
              from: SERVICE_EMAIL,
              cc: this.designspecialistemail,
              bcc: staff.Chris.email,
              name: SERVICE_NAME,
          });
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
const SendEmail = async ({
  email : email = SERVICE_EMAIL,
  staffEmail : staffEmail = SERVICE_EMAIL,
  status : status = `Default`,
  message : message = new CreateMessage(),
}) => {
  try {
    await MailApp.sendEmail(email, `${SERVICE_NAME} : ${status}`, ``, {
      htmlBody: message,
      from: SERVICE_EMAIL,
      cc: staffEmail,
      bcc: staff.Chris.email,
      name: SERVICE_NAME,
    });
    Log.Warning(`"${status}" Email sent to student and status set to "${status}".`);
    return 0;
  } catch (err) {
    console.error(`Could not email: ${err}`);
  }
}










