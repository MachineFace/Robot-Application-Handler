

class Colorizer
{
  constructor({ 
    rowNumber : rowNumber = 1, 
    status : status = STATUS.received, 
  }) {
    this.rowNumber = rowNumber;
    this.status = status;
    this.wholerow = SpreadsheetApp.getActiveSheet().getRange(rowNumber, 1, 1, SpreadsheetApp.getActiveSpreadsheet().getLastColumn());
    this.SetRowColorByStatus();
  }

  async SetRowColorByStatus () {
    try {  
      switch(this.status) {
        case STATUS.received:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setBackground(null); //unset
          console.warn(`Status: ${this.status}, Set Color to : None`);
          break;
        case STATUS.accepted:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setFontColor(COLORS.greenish);  //Greenish
          this.wholerow.setBackground(null); //unset
          this.wholerow.setBackground(COLORS.green_light); //Light Green
          console.warn(`Status: ${this.status}, Set Color to : Green`);
          break;
        case STATUS.pending:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setFontColor(COLORS.yellow_dark);  //Dark Yellow
          this.wholerow.setBackground(null); //unset
          this.wholerow.setBackground(COLORS.yellow_light); //Light yellow
          console.warn(`Status: ${this.status}, Set Color to : Yellow`);
          break;
        case STATUS.archived:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setFontColor(COLORS.grey);  //Gray
          this.wholerow.setBackground(null); //unset
          this.wholerow.setBackground(COLORS.grey_light); //Light Grey
          console.warn(`Status: ${this.status}, Set Color to : Grey`);
          break;
        case STATUS.rejected:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setFontColor(COLORS.red);  //Red
          this.wholerow.setBackground(null); //unset
          this.wholerow.setBackground(COLORS.red_light); //Light Red
          console.warn(`Status: ${this.status}, Set Color to : Red`);
          break;
        case STATUS.flagged:
          this.wholerow.setFontColor(null); //unset
          this.wholerow.setFontColor(COLORS.yellow);  //yellow
          this.wholerow.setBackground(null); //unset
          this.wholerow.setBackground(COLORS.yellow_light); //Light yellow
          console.warn(`Status: ${this.status}, Set Color to : Yellow`);
          break;
        case undefined:
          this.wholerow.setBackground(null);
          this.wholerow.setFontColor(null); //Unset Color
          console.warn(`Status: ${this.status}, Set Color to : None`);
          break;
        default:
          this.wholerow.setBackground(null);
          this.wholerow.setFontColor(null); //Unset Color
          console.warn(`Status: ${this.status}, Set Color to : None`);
          break;
      }    
    } catch(err) {
      console.error(`${err} : Couldn't color rows for some reason`);
    }
    
  }
}



/**
 * Change Row Color
 * @param {number} thisRow
 * @param {string} status
 */
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


const _testColorizer = () => {
  const c = new Colorizer({rowNumber : 3, status : STATUS.pending});
}