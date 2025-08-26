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
  
  // Set status to RECEIVED on new submission
  const s = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = s.getActiveSheet();

  // Set Design Specialists : Add More here if needed
  const Cody = new DesignSpecialist({ name : `Cody`, fullname : `Cody Glen`, email : `codyglen@berkeley.edu` });
  
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
  SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.status, lastRow, STATUS.received);
  SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.ds, lastRow, Cody.name);

  
  //----------------------------------------------------------------------------------------------------------------
  const rowData = SheetService.GetRowData(SHEETS.Applications, lastRow);
  let { status, ds, priority, timestamp, email, name, affiliation, pi, experience, exp_length, purpose, tooling, toxicity, other, sheetName, row } = rowData;
  console.info(rowData);
  
  // Check Student Type and set Priority
  try {
    if(!priority) {
      const p = new Priority({ studentType : studentType });
      const newPriority = p.priority;
      SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.priority, thisRow, newPriority);
    }
  } catch(err) {
    console.error(`${err}: Couldn't set priority for some reason...`);
  }
  
  // Flag for Toxic Project
  try {
    if(toxicity == 'Yes') {
      SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.status, lastRow, STATUS.flagged);
    }
  } catch(err) {
    console.error(`${err}: Couldn't flag project for toxic bullshit.`);
  }
  
  // Response
  const message = new CreateMessage({ name : name, designspecialist : Cody.name });
  
  // Email
  try {
    new Emailer({
      name : name, 
      status : status,
      email : email,    
      message : message,
    });
  } catch(err) {
    console.error(`${err}: Couldn't email for some reason`);
  }

}




/**
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * ON CHANGE
 */
const onChange = async (e) => { 
  const thisSheetName = e.range.getSheet().getSheetName();
  
  // Fetch Columns and rows and check validity
  const thisCol = e.range.getColumn();
  const thisRow = e.range.getRow();
  Log.Info(`Column : ${thisCol}, Row : ${thisRow}, Sheet : ${thisSheetName}`);

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
  const rowData = SheetService.GetRowData(SHEETS.Applications, thisRow);
  let { status, ds, priority, timestamp, email, name, affiliation, pi, experience, exp_length, purpose, tooling, toxicity, other, sheetName, row } = rowData;
  console.info(rowData);
  
  // Auto-Reject for toxicity
  try {
    if(toxicity == `Yes`) {
      SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.status, thisRow, STATUS.rejected);
    }
  } catch(err) {
    console.error(`${err}: Couldn't reject toxic project for some reason...`);
  }
  
  // Check Student Type and set Priority
  try {
    if(!priority) {
      const p = new Priority({ studentType : studentType });
      const newPriority = p.priority;
      SheetService.SetByHeader(SHEETS.Applications, HEADERNAMES.priority, thisRow, newPriority);
    }
  } catch(err) {
    console.error(`${err}: Couldn't set priority for some reason...`);
  }
  
  // Fix DS if missing
  ds = ds ? ds : Cody.name;
  
  // Create a message
  const message = new CreateMessage({ name : name, designspecialist : ds });
  
  // Email
  new Emailer({
    name : name, 
    status : status,
    email : email,    
    message : message,
  });
  
}













