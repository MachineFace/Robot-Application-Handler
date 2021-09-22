/**
 * ----------------------------------------------------------------------------------------------------------------
 * Check Priority
 * @param {string} studentType
 * @return {number} priority
 */
var CheckPriority = async (studentType) => {
  try {
      let priority = 0;    
      switch(studentType)
      {  
          case "Researcher":
          case "DES INV Faculty":
          case "Jacobs-affiliated Course Faculty":
          case "MDES Student":
          case "DES INV Student":
            priority = 1;
            cellcolor = '#d9ead3';
            break;     
          case "Jacobs Engineering Design Scholar":
          case "Innovation Catalysts Grantee":
            priority = 2;
            cellcolor = '#fff2cc';
            break;      
          case "Jacobs Staff (Including Work-studies)":
          case "Students in Jacobs-affiliated courses (NON-DES INV)":
          case "Club and/or Team":
            priority = 3;
            cellcolor = '#fce5cd';
            break;
          case "Other: Berkeley Faculty, Berkeley Staff, and Students":
            priority = 4;
            cellcolor = '#f4cccc';
            break;      
          case undefined:
          case "":
            break;
      }
      Logger.log(`Priority = ${priority}`);
      // return priority;
      return new Promise(resolve => {
          resolve(priority)
      })
  }
  catch(err)
  {
    Logger.log(err + ' : Couldnt check or set priority for some reason');
  }
}

let test = async () => {
    let studentType = "Researcher";
    let priority = await CheckPriority(studentType);
    Logger.log(`Tested Priority returns : ${priority}`);
}



/**
 * Change Row Color
 * @param {number} thisRow
 * @param {string} status
 */
var ChangeRowColor = async (thisRow, status) => {
    try
    {  
        let wholerow = SpreadsheetApp.getActiveSheet()
            .getRange(thisRow, 1, 1, SpreadsheetApp.getActiveSpreadsheet().getLastColumn());
        switch(status)
        {
          case 'Received':
            wholerow.setFontColor(null); //unset
            wholerow.setBackground(null); //unset
            break;
          case 'Accepted':
            wholerow.setFontColor(null); //unset
            wholerow.setFontColor('#93c47d');  //Greenish
            wholerow.setBackground(null); //unset
            wholerow.setBackground('#d9ead3'); //Light Green
            break;
          case 'Pending Approval':
            wholerow.setFontColor(null); //unset
            wholerow.setFontColor('#f1c232');  //Dark Yellow
            wholerow.setBackground(null); //unset
            wholerow.setBackground('#fff2cc'); //Light yellow
            break;
          case 'Archived':
            wholerow.setFontColor(null); //unset
            wholerow.setFontColor('#cccccc');  //Gray
            wholerow.setBackground(null); //unset
            wholerow.setBackground('#efefef'); //Light Gray
            break;
          case 'Rejected':
            wholerow.setFontColor(null); //unset
            wholerow.setFontColor('#a61c00');  //Red
            wholerow.setBackground(null); //unset
            wholerow.setBackground('#e6b8af'); //Light Red
            break;
          case 'Flagged':
            wholerow.setFontColor(null); //unset
            wholerow.setFontColor('#f1c232');  //yellow
            wholerow.setBackground(null); //unset
            wholerow.setBackground('#fff2cc'); //Light yellow
            break;
          case undefined:
            wholerow.setBackground(null);
            wholerow.setFontColor(null); //Unset Color
            break;
          default:
            wholerow.setBackground(null);
            wholerow.setFontColor(null); //Unset Color
            break;
        }    
    }
    catch(err)
    {
        Logger.log(err + ' : Couldnt color rows for some reason');
    }
  
}

