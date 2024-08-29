


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Design Specialist Class
 */
class CreateMessage {
  constructor({ 
    name : name = `Student Name`, 
    designspecialist : designspecialist = `Cody`, 
  }) {
    this.name = name;
    this.designspecialist = designspecialist;
    
    /** @private */
    this.greetings = `<p>Hi ${this.name},</p>`;
    /** @private */
    this.thanks = `Thank you for applying to ${SERVICE_NAME} to use our robots: Lucy & Ethel.<br/><br/>`;
    /** @private */
    this.questions = `If you have any questions or need assistance please email <a href="${SERVICE_EMAIL}">${SERVICE_EMAIL}.</a><br/>`;
    /** @private */
    this.salutations = `<p>Best,<br/>Jacobs Hall Staff</p>`;
    this.robot = `<br/>🤖<br/>`;
    /** @private */
    this.survey = `<p><small>Please help us improve ${SERVICE_NAME} by taking a moment for a brief survey:<br/><a href="https://docs.google.com/forms/d/1fICKWXj67v8k6EznXgkYz6qgiy45V8bV-X8dlRwRPDc/viewform">Take Survey</a></small></p><br/>`;
  }
  get defaultMessage() {
    let message = this.greetings;
        message += `<p>`;
        message += this.thanks;
        message += `A Design Specialist (Cody Glen) is reviewing you application to use the robots, and will respond to you shortly.<br/><br/>`;
        message += this.questions;
        message += `</p>`;
        message += this.salutations;
        message += this.robot;
        message += this.survey;
    return message; 
  }
  get receivedMessage() {
    let message = this.greetings;
        message += `<p>`;
        message += this.thanks;
        message += `A Design Specialist (Cody Glen) is reviewing you application to use the robots, and will respond to you shortly.<br/><br/>`;
        message += this.questions;
        message += `</p>`;
        message += this.salutations; 
        message += this.robot;
        message += this.survey;
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
        message += this.robot;
        message += this.survey;
    return message;
  }
  get rejectedMessage() {
    let message = this.greetings;
        message += `<p>`;
        message += this.thanks;
        message += `Unfortunately, we cannot support your project at this time.<br/>`;
        message += `This is likely du to one of the following reasons:<br/>`;
        message += `<ol>`; 
        message += `<li>The nature of your project being messy, toxic, noxious, or otherwise unhealthy.</li>`;
        message += `<li>Your project may be just beyond the scope or scale of what Jacobs Hall can support.</li>`;
        message += `<li>Your project may be better suited to a different machine or process</li>`;
        message += `</ol><br/>`; 
        message += `<b>You may also choose to reapply using different parameters if you believe this to be an error.</b><br/>`;
        message += this.questions;
        message += `</p>`;
        message += this.salutations;
        message += this.robot;
        message += this.survey; 
    return message;
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
