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

// Set Permissions - DONOTDELETE
/**
 * @OnlyCurrentDoc
 */
 


/**
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * ON SUBMIT
 */
const onFormSubmit = async (e) => {
  const writer = new WriteLogger(); 
  
  // Set status to RECEIVED on new submission
  const s = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = s.getActiveSheet();

  // Set Design Specialists : Add More here if needed
  const Cody = new DesignSpecialist({ name : 'Cody', fullname : 'Cody Glen', email : 'codyglen@berkeley.edu' });
  
  //----------------------------------------------------------------------------------------------------------------
  // Ignore Edits on background sheets
  const thisSheetName = e.range.getSheet().getSheetName();
  switch (thisSheetName) {
    case OTHERSHEETS.Logger.getSheetName():
    case OTHERSHEETS.StaffList.getSheetName():
      return;
  }
  
  // Loop through to get last row and set status to received
  const searchRange = sheet.getRange(2, 6, sheet.getLastRow()).getValues();
  let lastRow; 
  for (var i = 0; i < searchRange.length; i++)  {
    if (searchRange[i][0].toString() == "") {
      lastRow = i + 1;
      break;
    }
  }
  SetByHeader(SHEETS.Applications, HEADERNAMES.status, lastRow, STATUS.received);
  SetByHeader(SHEETS.Applications, HEADERNAMES.ds, lastRow, Cody.name);

  
  //----------------------------------------------------------------------------------------------------------------
  const rowData = GetRowData(SHEETS.Applications, lastRow);
  let { status, ds, priority, timestamp, email, name, affiliation, pi, experience, exp_length, purpose, tooling, toxicity, other, billing, sheetName, row } = rowData;
  console.info(rowData);
  
  // ----------------------------------------------------------------------------------------------------------------
  // Check Student Type and set Priority
  try {
    const p = new Priority({ studentType : affiliation });
    const cellColor = p.cellcolor;
    SetByHeader(SHEETS.Applications, HEADERNAMES.priority, lastRow, priority);
    GetCellByHeader(SHEETS.Applications, HEADERNAMES.priority, lastRow).setBackground(cellColor);
  } catch(err) {
    writer.Error(`${err} : Couldn't set priority`);
  }
  
  // Flag for Toxic Project
  try {
    const lastcolumn = sheet.getLastColumn();
    const wholerow = sheet.getRange(lastRow, 1, 1, lastcolumn);
    if(toxicity == 'Yes') {
      SetByHeader(SHEETS.Applications, HEADERNAMES.status, lastRow, STATUS.flagged);
      wholerow.setBackground(null); // Unset previous color
      wholerow.setBackground(COLORS.red);  // RED
    } else wholerow.setBackground(null); // Unset previous color
  } catch(err) {
    writer.Error(`${err} : Couldn't flag project for toxic bullshit.`);
  }
  
  // Response
  const response = await new CreateMessage({ name : name, designspecialist : Cody.name });
  
  // Email
  try {
    GmailApp.sendEmail(email, `${SERVICENAME} : Application Received`, '', {
      htmlBody : response.defaultMessage, 
      'from': SUPPORTALIAS,  
      'bcc' : '',
      'name' : SERVICENAME} );
  } catch(err) {
    writer.Error(`${err} : Couldn't email for some reason`);
  }

}




/**
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * ON CHANGE
 */
const onChange = async (e) => { 
  const writer = new WriteLogger();
  const thisSheetName = e.range.getSheet().getSheetName();
  
  // Fetch Columns and rows and check validity
  const thisCol = e.range.getColumn();
  const thisRow = e.range.getRow();
  writer.Info(`Column : ${thisCol}, Row : ${thisRow}, Sheet : ${thisSheetName}`);

  // Set Design Specialists : Add More here if needed
  const Cody = new DesignSpecialist({ name : `Cody`, fullname : `Cody Glen`, email : `codyglen@berkeley.edu` });
  
  // Ignore Edits on background sheets like Data Metrics and Other
  switch (thisSheetName) {
    case OTHERSHEETS.Logger.getSheetName():
    case OTHERSHEETS.StaffList.getSheetName():
      return;     
  }

  // STATUS CHANGE TRIGGER
  // Only look at Column 1 for email trigger.
  if(thisCol > 1) return;
  if(thisRow == 1) return;
  
  // Parse Data
  const rowData = GetRowData(SHEETS.Applications, thisRow);
  let { status, ds, priority, timestamp, email, name, affiliation, pi, experience, exp_length, purpose, tooling, toxicity, other, billing, sheetName, row } = rowData;
  console.info(rowData);
  
  // ----------------------------------------------------------------------------------------------------------------
  // Change colors of row based on Status
  new Colorizer({ rowNumber : thisRow, status : status });
  
  //----------------------------------------------------------------------------------------------------------------
  // Auto-Reject for toxicity
  try {
    if(toxicity == `Yes`) {
      SetByHeader(SHEETS.Applications, HEADERNAMES.status, thisRow, STATUS.rejected);
    }
  } catch(err) {
    writer.Error(`${err} : Couldn't reject toxic project for some reason...`);
  }
  
  
  //----------------------------------------------------------------------------------------------------------------
  // Check Student Type and set Priority
  try {
    if(!priority) {
      const p = new Priority({ studentType : studentType });
      const newPriority = p.priority;
      const cellColor = p.cellcolor;
      SetByHeader(SHEETS.Applications, HEADERNAMES.priority, thisRow, newPriority);
      GetCellByHeader(SHEETS.Applications, HEADERNAMES.priority, thisRow)
        .setBackground(cellColor);
    }
  } catch(err) {
    writer.Error(`${err} : Couldn't set priority for some reason...`);
  }
  
  // Fix DS if missing
  ds = ds ? ds : Cody.name;
  
  
  // Create a message
  const Message = await new CreateMessage({ name : name, designspecialist : ds });
  
  // Send email with appropriate response
  try {
    switch(status) {
      case STATUS.received:
        await GmailApp.sendEmail(email, `${SERVICENAME} : Application Received`, '', {
          htmlBody : Message.receivedMessage, 
          'from' : SUPPORTALIAS, 
          'cc' : '',
          'bcc' : '',
          'name' : SERVICENAME});
        writer.Warning(`Student: ${name} has been emailed ${STATUS.received} message.`);
        break;
      case STATUS.accepted:
        await GmailApp.sendEmail(email, `${SERVICENAME} : Application Accepted`, '', {
          htmlBody : Message.acceptedMessage, 
          'from' : SUPPORTALIAS, 
          'cc' : '',
          'bcc' : '',
          'name' : SERVICENAME});
        writer.Warning(`Student: ${name} has been emailed ${STATUS.accepted} message.`);
        break;
      case STATUS.rejected:
        await GmailApp.sendEmail(email, `${SERVICENAME} : Application Declined`, '', {
          htmlBody : Message.rejectedMessage, 
          'from' : SUPPORTALIAS, 
          'cc' : '',
          'bcc' : '',
          'name': SERVICENAME});
        writer.Warning(`Student: ${name} has been emailed ${STATUS.rejected} message.`);
        break; 
      case "":
      case undefined:
        break;
    }
  } catch(err) {
    writer.Error(`${err} : Couldn't send email on status update for some reason.....`);
  }

  // Check Color Again
  
  const stat = GetByHeader(SHEETS.Applications, HEADERNAMES.status, thisRow);
  new Colorizer({ rowNumber : thisRow, status : stat });
  
}













