

/**
 * ----------------------------------------------------------------------------------------------------------------
 * Make a browser box to ask to generate an email
 */

var AskToEmail = () => {
  var response;
  try
  {
    response = Browser.msgBox('Generate Email', 'Would you like to Generate an Email?', Browser.Buttons.YES_NO_CANCEL);
    Logger.log(response);
    if (response == "Yes") 
    {
      Logger.log('User clicked "Yes".');
      return true;
    } 
    else 
    {
      return false;
    }
  }
  catch(err)
  {
    Logger.log(err + ' : Could not generate a message box to gather info.');
  }
  finally
  {
    return true;
  }
}
