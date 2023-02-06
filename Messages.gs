


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
      this.designspecialistemaillink = `<a href="jacobsprojectsupport@berkeley.edu">jacobsprojectsupport@berkeley.edu</a>`;
    }
    get defaultMessage() {
      let message = `<p>Hi ${this.name},</p>`;
          message += `<p>Thank you for applying to use Jacobs Hall Robots : Lucy & Ethel.<br/><br/>`;
          message += `A Design Specialist (Cody Glen) is reviewing you application to use the robots, and will respond to you shortly.<br/><br/>`;
          message += `If you have questions or need assistance please email ${this.designspecialistemaillink}. <br/></p>`;
          message += `<p>Best,<br />Jacobs Hall Staff</p>`; 
      return message; 
    }
    get receivedMessage() {
      let message = `<p>Hi ${this.name},</p>`;
          message += `<p>Thank you for applying to use the Jacobs Hall Robots : Lucy & Ethel.<br />`;
          message += `A Design Specialist (Cody Glen) will review your application, and will respond shortly.<br/><br/>`;
          message += `If you have any questions or need assistance please email ${this.designspecialistemaillink}. <br/>`;
          message += `<p>Best,<br />Jacobs Hall Staff</p>`;
      return message;
    }
    get acceptedMessage() {
      let message = `<p>Hi ${this.name},</p>`;
          message += `<p>Thank you for applying to use Jacobs Hall Robots. Your application has been approved.<br/><br/>`;
          message += `Please email ${this.designspecialist} at ${this.designspecialistemaillink} for further details.<br/><br/>`;
          message += `If you have questions or need assistance please email ${this.designspecialistemaillink}.<br/>`;
          message += `</p>`;
          message += `<p>Best,<br />Jacobs Hall Staff</p>`;
      return message;
    }
    get rejectedMessage() {
      let message = `<p>Hi ${this.name},</p>`;
          message += `<p>Thank you for applying to use Jacobs Hall Robots.<br />`;
          message += `Unfortunately, we cannot support your project at this time. `; 
          message += `This is likely due to answering "Yes" to the question about the messy, toxic, noxious, or otherwise unhealthy nature of your project.<br/>`;
          message += `It is also likely that your project may be better suited to a different machine or process, or your project may be just beyond the scope or scale of what Jacobs Hall can support.<br/><br/>`;
          message += `Please contact ${this.designspecialist} for more information, or if you believe this to be an error: ${this.designspecialistemaillink}<br /><br />`;
          message += `You may also choose to reapply using different parameters.<br/>`;
          message += `If you have any questions or need assistance please email ${this.designspecialistemaillink}. <br/>`;  
          message += `<p>Best,<br />Jacobs Hall Staff</p>`;
      return message;
    }

    _MakeLink (email) {
      return `<a href="${email}">${email}</a>`;
    }
}


const _testMessage = () => {
  const m = new CreateMessage({ name : "Stu Dent", designspecialist : "Dirkus" });
  console.info(m.receivedMessage);
  console.info(m.defaultMessage);
  console.warn(m.acceptedMessage);
  console.error(m.rejectedMessage);
}
