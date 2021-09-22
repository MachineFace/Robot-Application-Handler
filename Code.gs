/**
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * 
 * Code developed by Cody Glen for Jacobs Institute for Design Innovation - UC Berkeley
 * Release 20200821 - Version 0.1
 * Last Updated: 20200821 - Version 0.1
 * URL for Spreadsheet: https://docs.google.com/spreadsheets/d/1kV7ZZKx7tzQw5qLvDey2vI7FsdHsCnvC3LcPtn-F6DY/edit#gid=664148093
 * 
 * Robot Application Handler - A handler to manage student requests and auto-emailing system for approval processes. (JRS)
 * 
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 */




//Set Permissions - DONOTDELETE
/**
 * @OnlyCurrentDoc
 */
 

/**
 * Fetch my Gmail Alias for jacobsprojectsupport@berkeley.edu
 */
const supportAlias = GmailApp.getAliases()[0];

/**
 * Dictionary of sheets.
 */
const sheetDict = {
    Applications : SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications'),
    StaffList : SpreadsheetApp.getActiveSpreadsheet().getSheetByName('StaffList')
}




/**
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * ON SUBMIT
 */

//Trigger 1 - On Submission
const onFormSubmit = async (e) => { 
  
  //Set status to RECEIVED on new submission
  const masterSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = masterSheet.getActiveSheet();

  //Set Design Specialists : Add More here if needed
  const Cody = new DesignSpecialist('Cody', 'Cody Glen', 'codyglen@berkeley.edu');
  const Chris = new DesignSpecialist('Chris', 'Chris Parsell', 'cparsell@berkeley.edu');
  const Staff = new StudentSupervisor('Staff', 'Staff', 'jacobsprojectsupport@berkeley.edu');
  Logger.log(`${Cody.toString()}, ${Chris.toString()}, ${Staff.toString()}`);
  
  //----------------------------------------------------------------------------------------------------------------
  //Ignore Edits on background sheets
  const thisSheetName = e.range.getSheet().getSheetName();
  switch (thisSheetName)
  {
    case 'Logger':
    case 'Staff List':
      return;
  }
  
  //Loop through to get last row and set status to received
  var searchRange = sheet.getRange(2, 6, sheet.getLastRow()).getValues();
  var lastRow; 
  for (var i = 0; i < searchRange.length; i++) 
  {
    if (searchRange[i][0].toString() == "") 
    {
      lastRow = i+1;
      break;
    }
  }
  sheet.getRange("A"+lastRow).setValue("Received");
  sheet.getRange("B"+lastRow).setValue("Cody");
  
  
  //----------------------------------------------------------------------------------------------------------------
  //Parse
  try
  {
    var extract = new Parse(e);
    var name = extract.name;
    var email = extract.email;
    var studentType = extract.studentType;
    var toxicity = extract.toxicity;
    var instructor = extract.instructor;
    
    //Log
    Logger.log(`Name = ${name}`);
    Logger.log(`Email = ${email}`);
    Logger.log(`Type = ${studentType}`);
    Logger.log(`Toxicity = ${toxicity}`);
    Logger.log(`PI = ${instructor}`);
  }
  catch(err)
  {
    Logger.log(err + ' : Couldnt parse data. Its all fucky.');
  }
  
  
  //----------------------------------------------------------------------------------------------------------------
  //Check Student Type and set Priority
  try
  {
    let priority = await CheckPriority(studentType);
    sheet.getRange("C"+lastRow).setValue(priority);
    switch(priority)
    {
      case 1:
        sheet.getRange("C"+lastRow).setBackground('#d9ead3'); //light green
        break;
      case 2:
        sheet.getRange("C"+lastRow).setBackground('#fff2cc'); //light yellow
        break;
      case 3:
        sheet.getRange("C"+lastRow).setBackground('#fce5cd'); //light orange
        break;
      case 4:
        sheet.getRange("C"+lastRow).setBackground('#f4cccc'); //light red
        break;
      case undefined:
        break;
    }
  }
  catch(err)
  {
    Logger.log(err + ' : Couldnt set priority');
  }
  
  //Flag for Toxic Project
  try
  {
    var columncount = sheet.getLastColumn();
    var wholerow = sheet.getRange(lastRow, 1, 1, columncount);
    if(toxicity == 'Yes')
    {
      sheet.getRange("A"+lastRow).setValue("Flagged");
      wholerow.setBackground(null); //Unset previous color
      wholerow.setBackground('#f4cccc');  //RED
    }
    else
      wholerow.setBackground(null); //Unset previous color
  }
  catch(err)
  {
    Logger.log(err + ' : Couldnt flag project for toxic bullshit.');
  }
  
  //Response
  var response = await new CreateMessage(name, Cody.name, Cody.link, Staff.link);
  
  //Email
  try
  {
    GmailApp.sendEmail(email, 'Jacobs Robot Support : Application Received', '', {
      htmlBody:response.defaultMessage, 
      'from':supportAlias,  
      'bcc': '',
      'name': "Jacobs Robot Support"} );
  }
  catch(err)
  {
    Logger.log(err + 'Couldnt email for some reason');
  }

}




//=======================================================================================================================================================================
//=======================================================================================================================================================================
//ON EDIT

//----------------------------------------------------------------------------------------------------------------
//Trigger 2 - On Edit
const onEdit = async (e) => { 

  const ss = e.range.getSheet();
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const thisSheetName = ss.getSheetName();
  
  //Fetch Columns and rows and check validity
  const thisCol = e.range.getColumn();
  const thisRow = e.range.getRow();
  Logger.log(`Column = ${thisCol}, Row = ${thisRow}, Sheet = ${thisSheetName}`);

  //Set Design Specialists : Add More here if needed
  const Cody = await new DesignSpecialist('Cody', 'Cody Glen', 'codyglen@berkeley.edu');
  const Chris = await new DesignSpecialist('Chris', 'Chris Parsell', 'cparsell@berkeley.edu');
  const Staff = await new StudentSupervisor('Staff', 'Staff', 'jacobsprojectsupport@berkeley.edu');
  Logger.log(`${Cody.toString()}, ${Chris.toString()}, ${Staff.toString()}`);
  
  //Ignore Edits on background sheets like Data Metrics and Other
  switch (thisSheetName)
  {
    case 'Data Metrics':
    case 'Other':
      return;     
  }

  //STATUS CHANGE TRIGGER
  //Only look at Column 1 for email trigger.
  if(thisCol > 1) return;
  
  //Parse Data
  const status = ss.getRange(thisRow,1).getValue();
  const designspecialist = ss.getRange(thisRow,2).getValue();
  const prioritylevel = ss.getRange(thisRow,3).getValue();
  const timestamp = ss.getRange(thisRow,4).getValue();
  const email = ss.getRange(thisRow,5).getValue();
  const name = ss.getRange(thisRow,6).getValue();
  const studentType = ss.getRange(thisRow, 7).getValue();
  const instructorName = ss.getRange(thisRow, 8).getValue();
  
  const experiencelevel = ss.getRange(thisRow,11).getValue();
  const projecttype = ss.getRange(thisRow,12).getValue();
  const tools = ss.getRange(thisRow,13).getValue();
  const toxicity = ss.getRange(thisRow,14).getValue();
  const other = ss.getRange(thisRow,15).getValue();
  
  Logger.log(`Submission Time = ${timestamp}, Name = ${name}, Email = ${email}, Student Type = ${studentType}`);
  
  //Fix empty variables
  if(designspecialist == "") designspecialist = "a Design Specialist";

  
  //----------------------------------------------------------------------------------------------------------------
  //Change colors of row based on Status
  var color = ChangeRowColor(thisRow, status);
  
  //----------------------------------------------------------------------------------------------------------------
  //Auto-Reject for toxicity
  try
  {
    if(toxicity == 'Yes') ss.getRange(thisRow,1).setValue("Rejected");
  }
  catch(err)
  {
    Logger.log(err + 'Couldnt reject toxic project for some reason');
  }
  
  
  //----------------------------------------------------------------------------------------------------------------
  //Check Student Type and set Priority

  let priority = await CheckPriority(studentType);
  Logger.log(`Priority from Async = ${priority}`);

  ss.getRange(thisRow, 3).setValue(priority);
  switch(priority)
  {
    case 1:
      ss.getRange(thisRow, 3).setBackground('#d9ead3'); //light green
      break;
    case 2:
      ss.getRange(thisRow, 3).setBackground('#fff2cc'); //light yellow
      break;
    case 3:
      ss.getRange(thisRow, 3).setBackground('#fce5cd'); //light orange
      break;
    case 4:
      ss.getRange(thisRow, 3).setBackground('#f4cccc'); //light red
      break;
    case undefined:
      break;
  }

  
  
  
  //----------------------------------------------------------------------------------------------------------------
  //Case switch for different Design Specialists email
  var designspecialistemaillink;
  var designspecialistemail;
  switch(designspecialist)
  {
    case "Chris":
      designspecialistemaillink = Chris.link;
      designspecialistemail = Chris.email;
      break;
    case "Cody":
      designspecialistemaillink = Cody.link;
      designspecialistemail = Cody.email;
      break;
    case "Staff":
      designspecialistemaillink = Staff.link;
      designspecialistemail = Staff.email;
      break;
    case undefined:
      designspecialistemaillink = Staff.link;
      designspecialistemail = Staff.email;
      break;
    case "a Design Specialist":
      designspecialistemaillink = Staff.link;
      designspecialistemail = Staff.email;
      break;
  }
  
  
  //Create a message
  var Message = await new CreateMessage(name, designspecialist, designspecialistemaillink, Staff.link)
  
  //Send email with appropriate response
  try
  {
    switch(status)
    {
      case "Received":
          await GmailApp.sendEmail(email, 'Jacobs Robot Support : Application Received', '', {
            htmlBody: Message.receivedMessage, 
            'from':supportAlias, 
            'cc': '',
            'bcc': '',
            'name': 'Jacobs Robot Support'});
          Logger.log(Message.acceptedMessage);
          break;
      case "Accepted":
          await GmailApp.sendEmail(email, 'Jacobs Robot Support : Application Accepted', '', {
            htmlBody: Message.acceptedMessage, 
            'from':supportAlias, 
            'cc': '',
            'bcc': '',
            'name': 'Jacobs Robot Support'});
          Logger.log(Message.acceptedMessage);
          break;
      case "Rejected":
 
          await GmailApp.sendEmail(email, 'Jacobs Robot Support : Application Declined', '', {
            htmlBody: Message.rejectedMessage, 
            'from':supportAlias, 
            'cc': '',
            'bcc': '',
            'name': 'Jacobs Robot Support'});
          Logger.log(Message.rejectedMessage);
          break; 
      case "":
      case undefined:
        break;
    }
  }
  catch(err)
  {
    Logger.log(err + 'Couldnt send email on status update for some reason.');
  }
  
}













