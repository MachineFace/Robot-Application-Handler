


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Design Specialist Class
 */
class CreateMessage
{
    constructor({ 
      name : name = `Student Name`, 
      designspecialist : designspecialist = `Cody`, 
    }) {
      this.name = name;
      this.designspecialist = designspecialist;
      
      /** @private */
      this.greetings = `<p>Hi ${this.name},</p>`;
      this.thanks = `Thank you for applying to ${SERVICE_NAME} to use our robots: Lucy & Ethel.<br/><br/>`;
      this.questions = `If you have any questions or need assistance please email <a href="${SERVICE_EMAIL}">${SERVICE_EMAIL}.</a><br/>`;
      this.salutations = `<p>Best,<br/>Jacobs Hall Staff</p>`;
    }
    get defaultMessage() {
      let message = this.greetings;
          message += `<p>`;
          message += this.thanks;
          message += `A Design Specialist (Cody Glen) is reviewing you application to use the robots, and will respond to you shortly.<br/><br/>`;
          message += this.questions;
          message += `</p>`;
          message += this.salutations; 
      return message; 
    }
    get receivedMessage() {
      let message = this.greetings;
          message += `<p>`;
          message += this.thanks;
          message += `A Design Specialist (Cody Glen) will review your application, and will respond shortly.<br/><br/>`;
          message += this.questions;
          message += `</p>`;
          message += this.salutations; 
      return message;
    }
    get acceptedMessage() {
      let message = this.greetings;
          message += `<p>`;
          message += this.thanks;
          message += `Your application has been approved.<br/><br/>`;
          message += `Please see Cody in the lab for further details.<br/><br/>`;
          message += this.questions;
          message += `</p>`;
          message += this.salutations; 
      return message;
    }
    get rejectedMessage() {
      let message = this.greetings;
          message += `<p>`;
          message += this.thanks;
          message += `Unfortunately, we cannot support your project at this time.<br/>`; 
          message += `This is likely due to the nature of your project being messy, toxic, noxious, or otherwise unhealthy.<br/>`;
          message += `It is also likely that your project may be better suited to a different machine or process, or your project may be just beyond the scope or scale of what Jacobs Hall can support.<br/><br/>`;
          message += `You may also choose to reapply using different parameters if you believe this to be an error.<br/>`;
          message += this.questions;
          message += `</p>`;
          message += this.salutations; 
      return message;
    }

    _MakeLink (email) {
      return `<a href="${email}">${email}</a>`;
    }
}


const _testMessage = () => {
  const m = new CreateMessage({ name : "Stu Dent", designspecialist : "Dirkus" });
  console.info(m instanceof CreateMessage);
  console.info(m.receivedMessage);
  console.info(m.defaultMessage);
  console.warn(m.acceptedMessage);
  console.error(m.rejectedMessage);
}
