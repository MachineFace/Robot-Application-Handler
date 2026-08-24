/**
 * Load GasT for Testing
 * See : https://github.com/huan/gast for instructions
 */
const gasT_URL = `https://raw.githubusercontent.com/huan/gast/master/src/gas-tap-lib.js`;
if ((typeof GasTap) === 'undefined') {
  var cs = CacheService.getScriptCache().get('gast');
  if(!cs){
    cs = UrlFetchApp.fetch(gasT_URL).getContentText();
    CacheService.getScriptCache().put('gast', cs, 21600);
  }
  eval(cs);
}


/**
 * Test with GasT
 * @private
 * PASSED 6/16/2025
 */
const _gasTMainTesting = async () => {
  console.warn(`Testing: ${new Error().stack.split('\n')[1].split(`at `)[1]}`);  // Print Enclosing Function Name
  const test = new GasTap();

  await test(`Priority Test`, (t) => {
    let x, y;

    x = new Priority({});
    y = true;
    t.equal(x instanceof Priority, y, `Instance of priority class: ${x instanceof Priority}`);

    x = new Priority({ studentType : STUDENT_TYPES.general_students }).priority;
    y = 4;
    t.equal(x, y, `Expected: ${y}, Actual: ${x}`);

    x = new Priority({ studentType : STUDENT_TYPES.mdes_student }).priority;
    y = 1;
    t.equal(x, y, `Expected: ${y}, Actual: ${x}`);

    x = new Priority({ studentType : STUDENT_TYPES.engineering_scholar }).priority;
    y = 2;
    t.equal(x, y, `Expected: ${y}, Actual: ${x}`);

    x = new Priority({ studentType : STUDENT_TYPES.innovation_catalyst }).priority;
    y = 2;
    t.equal(x, y, `Expected: ${y}, Actual: ${x}`);

    x = new Priority({ studentType : STUDENT_TYPES.other }).priority;
    y = 4;
    t.equal(x, y, `Expected: ${y}, Actual: ${x}`);
  });
  
  await test(`Design Specialist Creation`, (t) => {
    let x, y;
    x = new DesignSpecialist({ name : `Testa`, fullname : `Testa Nama`, email: `some@thing.com` });
    y = `Testa Nama`;
    t.equal(x.fullname, y, `DS ${x.name} created.`);
    t.equal(x.isAdmin, true, `Admin check should be true.`);
  });

  await test(`Manager Creation`, (t) => {
    const x = new Manager({ name : `Testa`, fullname : `Testa Nama`, email: `some@thing.com` });
    t.equal(x.fullname, `Testa Nama`, `DS ${x.name} created.`);
    t.equal(x.isAdmin, true, `Admin check should be true.`);
  });

  await test(`StudentSupervisor Creation`, (t) => {
    const x = new StudentSupervisor({ name : `Testa`, fullname : `Testa Nama`, email: `some@thing.com` });
    t.equal(x.fullname, `Testa Nama`, `DS ${x.name} created.`);
    t.equal(x.isAdmin, false, `Admin check should be false.`);
  });
  
  await test.finish();
  if (test.totalFailed() > 0) throw "Some test(s) failed!";
}

/**
 * Test Message with GasT
 * @private
 * PASSED 6/16/2025
 */
const _gasTMessagingTesting = async () => {
  console.warn(`Testing: ${new Error().stack.split('\n')[1].split(`at `)[1]}`);  // Print Enclosing Function Name
  const test = new GasTap();

  await test(`CreateMessage DEFAULT`, (t) => {
    const message = new CreateMessage({});

    let x, y;
    x = `DEFAULT ${message.defaultMessage}`;
    t.notThrow(() => x, `DEFAULT SHOULD NOT throw error.`);

    x = `RECEIVED ${message.receivedMessage}`;
    t.notThrow(() => x, `RECEIVED SHOULD NOT throw error.`);

    x = `ACCEPTED ${message.acceptedMessage}`;
    t.notThrow(() => x, `ACCEPTED SHOULD NOT throw error.`);

    x = `REJECTED ${message.rejectedMessage}`;
    t.notThrow(() => x, `REJECTED SHOULD NOT throw error.`);

  });

  await test(`CreateMessage`, (t) => {
    const message = new CreateMessage({
      name : 'Cody', 
      designspecialist : 'designspecialist',
    });
    let x, y;
    
    x = `DEFAULT ${message.defaultMessage}`;
    y = undefined || null;
    t.notEqual(x, y, `DEFAULT SHOULD NOT return ${y}, Actual: ${x}.`);

    x = `RECEIVED ${message.receivedMessage}`;
    y = undefined || null;
    t.notEqual(x, y, `RECEIVED SHOULD NOT return ${y}, Actual: ${x}.`);

    x = `ACCEPTED ${message.acceptedMessage}`;
    y = undefined || null;
    t.notEqual(x, y, `ACCEPTED SHOULD NOT return ${y}, Actual: ${x}.`);

    x = `REJECTED ${message.rejectedMessage}`;
    y = undefined || null;
    t.notEqual(x, y, `REJECTED SHOULD NOT return ${y}, Actual: ${x}.`);

  });

  await test.finish();
  if (test.totalFailed() > 0) throw "Some test(s) failed!";
}

/**
 * Test Emailer
 * @private
 * PASSED 6/16/2025
 */
const _gasTEmailTesting = async () => {
  console.warn(`Testing: ${new Error().stack.split('\n')[1].split(`at `)[1]}`);  // Print Enclosing Function Name
  const test = new GasTap();

  await test(`Email`, async (t) => {
    const name = `Testa Fiesta`;
    const designspecialist = `Sporelax`;
    const message = new CreateMessage({ name : name, designspecialist : designspecialist });

    const ac = message.acceptedMessage;
    const de = message.defaultMessage;
    const rc = message.receivedMessage;
    const rj = message.rejectedMessage;

    const xAC = new Emailer({
      name : name, 
      status : STATUS.accepted,
      email : SERVICE_EMAIL,    
      message : ac,
    });
    t.notThrow(() => xAC, `ACCEPTED email SHOULD NOT throw error.`);

    const xDE = new Emailer({
      name : name, 
      status : STATUS.pending,
      email : SERVICE_EMAIL,    
      message : de,
    });
    t.notThrow(() => xDE, `DEFAULT email SHOULD NOT throw error.`);

    const xRC = new Emailer({
      name : name, 
      status : STATUS.received,
      email : SERVICE_EMAIL,    
      message : rc,
    });
    t.notThrow(() => xRC, `RECEIVED email SHOULD NOT throw error.`);

    const xRJ = new Emailer({
      name : name, 
      status : STATUS.rejected,
      email : SERVICE_EMAIL,    
      message : rj,
    });
    t.notThrow(() => xRJ, `REJECTED email SHOULD NOT throw error.`);

  });

  await test.finish();
  if (test.totalFailed() > 0) throw "Some test(s) failed!";
}

/**
 * Test Logger and Message with GasT
 * @private
 * PASSED 6/16/2025
 */
const _gasTLoggerTesting = async () => {
  console.warn(`Testing: ${new Error().stack.split('\n')[1].split(`at `)[1]}`);  // Print Enclosing Function Name
  const test = new GasTap();

  await test(`Logger`, (t) => {

    const x = Log.Warning(`Warning Test ----> Message`);
    const y = Log.Info(`Info Test ----> Message`);
    const z = Log.Error(`ERROR Test ----> Message`);
    const w = Log.Debug(`Debugging Test ----> Message`);
    t.notThrow(() => x, `Warning SHOULD NOT throw error.`);
    t.notThrow(() => y, `Info SHOULD NOT throw error.`);
    t.notThrow(() => z, `Error SHOULD NOT throw error.`);
    t.notThrow(() => w, `Debug SHOULD NOT throw error.`);
  });

  await test.finish();
  if (test.totalFailed() > 0) throw "Some test(s) failed!";
}

/**
 * Test Misc with GasT
 * @private
 * PASSED 6/16/2025
 */
const _gasTMiscTesting = async () => {
  console.warn(`Testing: ${new Error().stack.split('\n')[1].split(`at `)[1]}`);  // Print Enclosing Function Name
  const test = new GasTap();

  // ------------------------------------------------------------------------------------------------------------------------------
  await test(`GetByHeader`, (t) => {
    const x = SheetService.GetByHeader(SHEETS.Applications, HEADERNAMES.email, 2);
    t.equal(x, `codyglen@berkeley.edu`, `GetByHeader SHOULD fetch email from that sheet. Actual: ${x}`);

    const y = SheetService.GetByHeader(SHEETS.Applications, `BAD COLUMN NAME`, 2);
    t.equal(y, 1, `GetByHeader SHOULD return "1". Actual: ${y}`);

    const z = SheetService.GetByHeader(`BAD SHEET`, HEADERNAMES.email, 2);
    t.equal(y, 1, `GetByHeader SHOULD return "1". Actual: ${y}`);

    const a = SheetService.GetByHeader(`BAD SHEET`, `BAD COLUMN NAME`, `BAD ROW NUMBER`);
    t.equal(a, 1, `GetByHeader SHOULD return "1". Actual: ${a}`);

  });

  await test(`GetColumnDataByHeader`, (t) => {
    const x = SheetService.GetColumnDataByHeader(SHEETS.Applications, HEADERNAMES.email);
    t.notEqual(x, undefined || null, `GetColumnDataByHeader SHOULD NOT return undefined or null: ${x}`);

    const y = SheetService.GetColumnDataByHeader(SHEETS.Applications, `BAD COLUMN NAME`);
    t.equal(y, 1, `GetColumnDataByHeader SHOULD return "1": ${y}`);

    const z = SheetService.GetColumnDataByHeader(`BAD SHEET`, `BAD COLUMN NAME`);
    t.equal(z, 1, `GetColumnDataByHeader SHOULD return "1": ${z}`);

  });

  await test(`GetRowData`, (t) => {
    const x = SheetService.GetRowData(SHEETS.Applications, 2);
    t.notEqual(x, undefined || null, `GetRowData SHOULD NOT return undefined or null: ${JSON.stringify(x)}`);

    const y = SheetService.GetRowData(SHEETS.Applications, `BAD COLUMN NAME`);
    t.equal(y, 1, `GetRowData SHOULD return "1": ${y}`);

    const z = SheetService.GetRowData(`BAD SHEET`, `BAD COLUMN NAME`);
    t.equal(z, 1, `GetRowData SHOULD return "1": ${z}`);

  });

  await test(`FindOne`, (t) => {
    const x = SheetService.FindOne(`codyglen@berkeley.edu`);
    t.notEqual(x, undefined || null, `FindOne should not return undefined or null. ${JSON.stringify(x)}`);

    const y = SheetService.FindOne(`BAD NAME`);
    t.equal(0, Object.entries(y).length, `FindOne SHOULD return empty object: ${JSON.stringify(y)}`);
  });

  await test(`SetByHeader`, (t) => {
    const x = SheetService.SetByHeader(OTHERSHEETS.Logger, `Date`, OTHERSHEETS.Logger.getLastRow(), `TESTING FUNCTIONALITY....`);
    t.notThrow(() => x, `SetByHeader SHOULD NOT throw an error. ${x}`);
    t.equal(x, 0, `SetByHeader SHOULD return "0": Actual: ${x}`);

    const y = SheetService.SetByHeader(`BAD SHEET`, `Date`, OTHERSHEETS.Logger.getLastRow(), `TESTING FUNCTIONALITY....`);
    t.equal(y, 1, `SetByHeader SHOULD return "1": Actual: ${y}`);

    const z = SheetService.SetByHeader(OTHERSHEETS.Logger, `BAD TITLE`, OTHERSHEETS.Logger.getLastRow(), `TESTING FUNCTIONALITY....`);
    t.throws(z, `SetByHeader SHOULD throw an error on bad column name: ${z}`)
    t.equal(z, 1, `SetByHeader SHOULD return "1": Actual: ${z}`);

    const a = SheetService.SetByHeader(OTHERSHEETS.Logger, `Date`, -1, `TESTING FUNCTIONALITY....`);
    t.throws(a, `SetByHeader SHOULD throw an error on bad row number: ${a}`)
    t.equal(a, 1, `SetByHeader SHOULD return "1": Actual: ${a}`);

  });

  await test.finish();
  if (test.totalFailed() > 0) throw "Some test(s) failed!";
}



/**
 * Test All with GasT
 */
const _gasTTestAll = async () => {
  Promise.all([
    await _gasTMainTesting(),
    await _gasTMessagingTesting(),
    await _gasTEmailTesting(),
    await _gasTLoggerTesting(),
    await _gasTMiscTesting(),
  ])
  .then(console.info('Test Success.'))
  .catch(err => {
    console.error(`Failure: ${err}`);
  });
}




