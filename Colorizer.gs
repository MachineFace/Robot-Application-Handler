

class Colorizer {
  constructor() {

  }

  /**
   * Set Row Color By Status
   * @param {sheet} sheet
   * @param {number} row number
   * @param {string} status
   * @return {bool} success
   */
  static SetRowColorByStatus(sheet = SpreadsheetApp.getActiveSheet(), row = 2, status = STATUS.received) {
    const lastColumn = sheet.getLastColumn();
    const wholeRow = sheet.getRange(row, 1, 1, lastColumn);
    try {  
      switch(status) {
        case STATUS.received:
          wholeRow.setFontColor(null); //unset
          wholeRow.setBackground(null); //unset
          console.warn(`Status: ${status}, Set Color to : None`);
          break;
        case STATUS.accepted:
          wholeRow.setFontColor(null); //unset
          wholeRow.setFontColor(COLORS.greenish);  //Greenish
          wholeRow.setBackground(null); //unset
          wholeRow.setBackground(COLORS.green_light); //Light Green
          console.warn(`Status: ${status}, Set Color to : Green`);
          break;
        case STATUS.pending:
          wholeRow.setFontColor(null); //unset
          wholeRow.setFontColor(COLORS.yellow_dark);  //Dark Yellow
          wholeRow.setBackground(null); //unset
          wholeRow.setBackground(COLORS.yellow_light); //Light yellow
          console.warn(`Status: ${status}, Set Color to : Yellow`);
          break;
        case STATUS.archived:
          wholeRow.setFontColor(null); //unset
          wholeRow.setFontColor(COLORS.grey);  //Gray
          wholeRow.setBackground(null); //unset
          wholeRow.setBackground(COLORS.grey_light); //Light Grey
          console.warn(`Status: ${status}, Set Color to : Grey`);
          break;
        case STATUS.rejected:
          wholeRow.setFontColor(null); //unset
          wholeRow.setFontColor(COLORS.red);  //Red
          wholeRow.setBackground(null); //unset
          wholeRow.setBackground(COLORS.red_light); //Light Red
          console.warn(`Status: ${status}, Set Color to : Red`);
          break;
        case STATUS.flagged:
          wholeRow.setFontColor(null); //unset
          wholeRow.setFontColor(COLORS.yellow);  //yellow
          wholeRow.setBackground(null); //unset
          wholeRow.setBackground(COLORS.yellow_light); //Light yellow
          console.warn(`Status: ${status}, Set Color to : Yellow`);
          break;
        case undefined:
          wholeRow.setBackground(null);
          wholeRow.setFontColor(null); //Unset Color
          console.warn(`Status: ${status}, Set Color to : None`);
          break;
        default:
          wholeRow.setBackground(null);
          wholeRow.setFontColor(null); //Unset Color
          console.warn(`Status: ${status}, Set Color to : None`);
          break;
      }
      return 0;   
    } catch(err) {
      console.error(`${err} : Couldn't color rows for some reason`);
      return 1;
    }
    
  }
}



/**
 * Change Row Color
 * @param {number} thisRow
 * @param {string} status
 *
const ChangeRowColor = async (thisRow, status) => {
  try {  
    let wholerow = SpreadsheetApp.getActiveSheet()
      .getRange(thisRow, 1, 1, SpreadsheetApp.getActiveSpreadsheet().getLastColumn());
    switch(status) {
      case STATUS.received:
        wholerow.setFontColor(null); //unset
        wholerow.setBackground(null); //unset
        break;
      case STATUS.accepted:
        wholerow.setFontColor(null); //unset
        wholerow.setFontColor(COLORS.greenish);  //Greenish
        wholerow.setBackground(null); //unset
        wholerow.setBackground(COLORS.green_light); //Light Green
        break;
      case STATUS.pending:
        wholerow.setFontColor(null); //unset
        wholerow.setFontColor(COLORS.yellow_dark);  //Dark Yellow
        wholerow.setBackground(null); //unset
        wholerow.setBackground(COLORS.yellow_light); //Light yellow
        break;
      case STATUS.archived:
        wholerow.setFontColor(null); //unset
        wholerow.setFontColor(COLORS.grey);  //Gray
        wholerow.setBackground(null); //unset
        wholerow.setBackground(COLORS.grey_light); //Light Gray
        break;
      case STATUS.rejected:
        wholerow.setFontColor(null); //unset
        wholerow.setFontColor(COLORS.red);  //Red
        wholerow.setBackground(null); //unset
        wholerow.setBackground(COLORS.red_light); //Light Red
        break;
      case STATUS.flagged:
        wholerow.setFontColor(null); //unset
        wholerow.setFontColor(COLORS.yellow);  //yellow
        wholerow.setBackground(null); //unset
        wholerow.setBackground(COLORS.yellow_light); //Light yellow
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
  } catch(err) {
    console.error(`${err} : Couldn't color rows for some reason`);
  }
  
}
*/

const _testColorizer = () => {
  Colorizer.SetRowColorByStatus(sheet, 3, STATUS.pending);
}