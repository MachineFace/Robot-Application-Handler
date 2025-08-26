

// class Colorizer {
//   constructor() {

//   }

//   /**
//    * Set Row Color By Status
//    * @param {sheet} sheet
//    * @param {number} row number
//    * @param {string} status
//    * @return {bool} success
//    */
//   static SetRowColorByStatus(sheet = SpreadsheetApp.getActiveSheet(), row = 2, status = STATUS.received) {
//     const lastColumn = sheet.getLastColumn();
//     const wholeRow = sheet.getRange(row, 1, 1, lastColumn);
//     try {  
//       switch(status) {
//         case STATUS.received:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setBackground(null); //unset
//           console.warn(`Status: ${status}, Set Color to : None`);
//           break;
//         case STATUS.accepted:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setFontColor(COLORS.greenish);  //Greenish
//           wholeRow.setBackground(null); //unset
//           wholeRow.setBackground(COLORS.green_light); //Light Green
//           console.warn(`Status: ${status}, Set Color to : Green`);
//           break;
//         case STATUS.pending:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setFontColor(COLORS.yellow_dark);  //Dark Yellow
//           wholeRow.setBackground(null); //unset
//           wholeRow.setBackground(COLORS.yellow_light); //Light yellow
//           console.warn(`Status: ${status}, Set Color to : Yellow`);
//           break;
//         case STATUS.archived:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setFontColor(COLORS.grey);  //Gray
//           wholeRow.setBackground(null); //unset
//           wholeRow.setBackground(COLORS.grey_light); //Light Grey
//           console.warn(`Status: ${status}, Set Color to : Grey`);
//           break;
//         case STATUS.rejected:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setFontColor(COLORS.red);  //Red
//           wholeRow.setBackground(null); //unset
//           wholeRow.setBackground(COLORS.red_light); //Light Red
//           console.warn(`Status: ${status}, Set Color to : Red`);
//           break;
//         case STATUS.flagged:
//           wholeRow.setFontColor(null); //unset
//           wholeRow.setFontColor(COLORS.yellow);  //yellow
//           wholeRow.setBackground(null); //unset
//           wholeRow.setBackground(COLORS.yellow_light); //Light yellow
//           console.warn(`Status: ${status}, Set Color to : Yellow`);
//           break;
//         case undefined:
//           wholeRow.setBackground(null);
//           wholeRow.setFontColor(null); //Unset Color
//           console.warn(`Status: ${status}, Set Color to : None`);
//           break;
//         default:
//           wholeRow.setBackground(null);
//           wholeRow.setFontColor(null); //Unset Color
//           console.warn(`Status: ${status}, Set Color to : None`);
//           break;
//       }
//       return 0;   
//     } catch(err) {
//       console.error(`${err} : Couldn't color rows for some reason`);
//       return 1;
//     }
    
//   }
// }


/**
 * Set the Conditional Formatting for each page
 * @TRIGGERED
 */
const SetConditionalFormatting = () => {
  try {
    const start_row = 2;
    // Mapping status values to their formatting options
    const format_mapping = {
      [STATUS.accepted]:     { bg: COLORS.light_green_3,      font: COLORS.dark_green_2 },
      [STATUS.archived]:     { bg: COLORS.light_gray_2,       font: COLORS.gray },
      [STATUS.flagged]:      { bg: COLORS.light_yellow_3,     font: COLORS.dark_yellow_2 },
      [STATUS.pending]:      { bg: COLORS.light_orange_3,     font: COLORS.dark_orange_2 },
      [STATUS.received]:     { bg: COLORS.light_purple_3,     font: COLORS.dark_purple_2 },
      [STATUS.rejected]:     { bg: COLORS.light_red_3,        font: COLORS.dark_red_2 },
    };

    Object.entries(SHEETS).forEach(([key, sheet], idx) => {
      const sheetName = SHEETS.Applications.getSheetName();
      if(key !== sheetName) {
        console.info(`Skipping ${sheetName}`); 
        return;
      }
      const last_row = sheet.getMaxRows();
      const last_column = sheet.getMaxColumns();
      const range = sheet.getRange(start_row, 1, last_row - start_row + 1, last_column);

      // Build conditional formatting rules based on the mapping.
      const rules = Object.entries(format_mapping).map(([status, format]) => {
        return SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied(`=$A2="${status}"`)
          .setRanges([range])
          .setBackground(format.bg)
          .setFontColor(format.font)
          .build();
      });

      sheet.setConditionalFormatRules(rules);
      console.warn(`Conditional Formatting set for "${sheet.getSheetName()}"`);
    });
    return 0;
  } catch(err) {
    console.error(`"SetConditionalFormatting()" failed: ${err}`);
    return 1;
  }
}

