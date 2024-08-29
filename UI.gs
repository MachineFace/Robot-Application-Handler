

/**
 * ----------------------------------------------------------------------------------------------------------------
 * Make a browser box to ask to generate an email
 */
const AskToEmail = () => {
  var response;
  try {
    response = Browser.msgBox(
      SERVICE_NAME, 
      `Would you like to Generate an Email?`, 
      Browser.Buttons.YES_NO_CANCEL
    );
    console.info(response);
    if (response == "Yes") {
      console.warn('User clicked "Yes".');
      return true;
    } else return false;
  } catch(err) {
    console.error(`${err} : Couldn't generate a message box to gather info.`);
  } finally {
    return true;
  }
}
