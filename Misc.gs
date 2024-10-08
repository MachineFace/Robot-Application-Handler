

/**
 * Search all Sheets for a value
 * @required {string} value
 * @returns {[sheet, [values]]} list of sheets with lists of indexes
 */
const Search = (value) => {
  if (value) value.toString().replace(/\s+/g, "");
  let res = {};
  Object.values(SHEETS).forEach(sheet => {
    const finder = sheet.createTextFinder(value).findAll();
    if (finder != null) {
      temp = [];
      finder.forEach(result => temp.push(result.getRow()));
      res[sheet.getName()] = temp;
    }
  })
  console.info(JSON.stringify(res));
  return res;
}


/**
 * Search a Specific Sheets for a value
 * @required {string} value
 * @returns {[sheet, [values]]} list of sheets with lists of indexes
 */
const SearchSpecificSheet = (sheet, value) => {
  if(typeof sheet != `object`) return 1;
  if (value) value.toString().replace(/\s+/g, "");
  const finder = sheet.createTextFinder(value).findNext();
  if (finder != null) {
    return finder.getRow();
  } else return false;
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Return the value of a cell by column name and row number
 * @param {sheet} sheet
 * @param {string} colName
 * @param {number} row
 */
const GetByHeader = (sheet, columnName, row) => {
  if(typeof sheet != `object`) return 1;
  try {
    let data = sheet.getDataRange().getValues();
    let col = data[0].indexOf(columnName);
    if (col != -1) return data[row - 1][col];
    else {
      console.error(`Getting data by header fucking failed...`);
      return 1;
    }
  } catch (err) {
    console.error(`${err} : GetByHeader failed - Sheet: ${sheet} Col Name specified: ${columnName} Row: ${row}`);
    return 1;
  }
};


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Return the values of a column by the name
 * @param {sheet} sheet
 * @param {string} colName
 * @param {number} row
 * @returns {array} column data, or 1 if fail. 
 */
const GetColumnDataByHeader = (sheet, columnName) => {
  if(typeof sheet != `object`) return 1;
  try {
    const data = sheet.getDataRange().getValues();
    const col = data[0].indexOf(columnName);
    let colData = data.map(d => d[col]);
    colData.splice(0, 1);
    if (col != -1) return colData;
    else {
      console.error(`Getting column data by header fucking failed...`);
      return 1;
    }
  } catch (err) {
    console.error(`${err} : GetByHeader failed - Sheet: ${sheet} Col Name specified: ${columnName}`);
    return 1;
  }
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Return the values of a row by the number
 * @param {sheet} sheet
 * @param {number} row
 * @returns {dict} {header, value}
 */
const GetRowData = (sheet, row) => {
  if(typeof sheet != `object`) return 1;
  let dict = {};
  try {
    let headers = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues()[0];
    headers.forEach( (name, index) => {
      let linkedKey = Object.keys(HEADERNAMES).find(key => HEADERNAMES[key] === name);
      if(!linkedKey) headers[index] = name;
      else headers[index] = linkedKey;
    })
    let data = sheet.getRange(row, 1, 1, sheet.getMaxColumns()).getValues()[0];
    headers.forEach( (header, index) => {
      dict[header] = data[index];
    });
    dict[`sheetName`] = sheet.getSheetName();
    dict[`row`] = row;
    // console.info(dict);
    return dict;
  } catch (err) {
    console.error(`${err} : GetRowData failed - Sheet: ${sheet} Row: ${row}`);
    return 1;
  }
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Set the value of a cell by column name and row number
 * @param {sheet} sheet
 * @param {string} colName
 * @param {number} row
 * @param {any} val
 * @returns {number} 0 if valid, 1 if fail.
 */
const SetByHeader = (sheet, columnName, row, val) => {
  if(typeof sheet != `object`) return 1;
  let data;
  let col;
  try {
    data = sheet.getDataRange().getValues();
    col = data[0].indexOf(columnName) + 1;
    if(col != -1) {
      sheet.getRange(row, col).setValue(val);
      return 0;
    } else return 1;
  } catch (err) {
    console.error(`${err} : SetByHeader failed - Sheet: ${sheet} Row: ${row} Col: ${col} Value: ${val}`);
    return 1;
  }
};


/**
 * 
 * Get Cell By Header
 * Returns the cell object when data is found
 * @param {sheet} sheet
 * @param {string} columnName
 * @param {number} row
 * @return {cell} cell
 */
const GetCellByHeader = (sheet, columnName, row) => {
  if(typeof sheet != `object`) return 1;
  let data;
  let col;
  try {
    data = sheet.getDataRange().getValues();
    col = data[0].indexOf(columnName) + 1;
    if(col == -1) throw new Error(`Headername not found. Try something else man.`);
    return sheet.getRange(row, col);
  } catch (err) {
    console.error(`${err} : SetByHeader failed - Sheet: ${sheet} Row: ${row} Col: ${col}`);
    return 1;
  }
};


/**
 * Search all Sheets for one specific value
 * @required {string} value
 * @returns {[sheet, [number]]} [sheetname, row]
 */
const FindOne = (value) => {
  if (value) value.toString().replace(/\s+/g, "");
  let res = {};
  for(const [key, sheet] of Object.entries(SHEETS)) {
    const finder = sheet.createTextFinder(value).findNext();
    if (finder != null) {
      // res[key] = finder.getRow();
      res = GetRowData(sheet, finder.getRow());
    }
  }
  return res;
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Find some data in the column
 * @param {spreadsheet} sheet
 * @param {string} column
 * @param {any} data
 * @returns {int} indexes
 */
const FindDataInColumn = (sheet, column, data) => {
  let indexes = [];
  let values = sheet.getRange(column + ":" + column).getValues(); // like A:A
  let row = 2;

  while (values[row] && values[row][0] !== data) row++;
  if (values[row][0] === data) indexes.push(row + 1);
  else return -1;
  return indexes;
};


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Find some data in the row
 * @param {spreadsheet} sheet
 * @param {any} data
 * @returns {[int]} column indexes
 */
const FindDataInRow = (sheet, data) => {
  let indexes = [];
  let rows = sheet.getDataRange.getValues();

  //Loop through all the rows and return a matching index
  for (let r = 1; r < rows.length; r++) {
    let index = rows[r].indexOf(data) + 1;
    indexes.push(index);
  }
  return indexes;
};


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Find an index in an array
 * @param {any} search
 * @returns {int} index
 */
Array.prototype.findIndex = (search) => {
  if (search == "") return false;
  for (let i = 0; i < this.length; i++)
    if (this[i].toString().indexOf(search) > -1) return i;
  return -1;
};


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Test if value is a date and return true or false
 * @param {date} d
 * @returns {boolean} b
 */
const isValidDate = (d) => {
  if (Object.prototype.toString.call(d) !== "[object Date]") return false;
  return !isNaN(d.getTime());
};


/**
 * Convert Datetime to Date
 * @param {date} d
 * @return {date} date
 */
const datetimeToDate = (d) => new Date(d.getYear(), d.getMonth(), d.getDate());


/**
 * Check if this sheet is forbidden
 * @param {sheet} sheet to check
 * @returns {bool} false if sheet is allowed
 * @returns {bool} true if forbidden
 */
const CheckSheetIsForbidden = (someSheet) => {
  someSheet = typeof someSheet == `object` ? someSheet : OTHERSHEETS.Logger;
  let forbiddenNames = [];
  Object.values(OTHERSHEETS).forEach( sheet => forbiddenNames.push(sheet.getName()));
  const index = forbiddenNames.indexOf(someSheet.getName());
  if(index == -1 || index == undefined) {
    console.info(`Sheet is NOT FORBIDDEN : ${someSheet.getName()}`)
    return false;
  } else {
    console.error(`SHEET FORBIDDEN : ${forbiddenNames[index]}`);
    return true;
  }
}


/**
 * Find Missing Elements in Array
 * @param {array}
 * @param {array}
 * @returns {array}
 */
const FindMissingElementsInArrays = (array1, array2) => {
  let indexes = [];
  array1.forEach( item => {
    let i = array2.indexOf(item);
    indexes.push(i);
  })
  return indexes;
}


/**
 * Validate an email string
 * @param {string} email
 * @returns {bool} boolean
 */
const ValidateEmail = (email) => {
  const regex = new RegExp(/^[a-zA-Z0-9+_.-]+@[berkeley.edu]+$/);
  let match = regex.test(email);
  console.warn(`Email is valid? : ${match}`)
  return match;
}


/**
 * Helper Method for TitleCasing Names
 * @param {string} string
 * @returns {string} titlecased
 */
const TitleCase = (str) => {
  str = str
    .toLowerCase()
    .split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const GetEnclosingFunctionName = () => {
  const ex = new Error();
  const fnName = ex.stack.split('\n')[1].split(`at `)[1];
  return fnName;
}


