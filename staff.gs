
/**
 * Get Staff emails
 * @return {[string]} emaillist
 */
var StaffEmailAsString = async () => {
  let stafflist = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Staff List");
  let last = stafflist.getLastRow();  
  let emaillist = stafflist.getRange(2, 3, last -1 , 1).getValues();
  Logger.log(emaillist.toString());
  return new Promise(resolve => {
      resolve(emaillist.toString());
  })
}


/**
 * Staff
 * @return {[string]} staffList
 */
const Staff = async () => {
    var stafflist = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Staff List");
    var last = stafflist.getLastRow();
    var staffrange = stafflist.getRange(2, 1, last -1, 5).getValues();
    
    var names = stafflist.getRange(2, 1, last -1, 1).getValues();
    var fullnames = stafflist.getRange(2, 2, last -1, 1).getValues();
    var emails = stafflist.getRange(2, 3, last -1, 1).getValues();
    var emaillinks = stafflist.getRange(2, 4, last -1, 1).getValues();
    var types = stafflist.getRange(2, 5, last -1, 1).getValues();
    
    var staffList = [];
    for(var i in names)
    { 
      if(types[i] == 'DS')
      {
        var DS = new DesignSpecialist(names[i], fullnames[i], emails[i]);
        staffList.push(DS);
      }
      else if(types[i] = 'MA')
      {
        var MA = new Manager(names[i], fullnames[i], emails[i]);
        staffList.push(MA);
      }
      else if(types[i] == 'SS')
      {
        var SS = new StudentSupervisor(names[i], fullnames[i], emails[i]);
        staffList.push(SS);
      }
    }
    return new Promise(resolve => {
        staffList.forEach(element => Logger.log(element));
        resolve(staffList);
    })
    
}



/**
 * Create Staff
 * @return {[string]} DSList
 */
const CreateStaff = async () => {
    var DSList = [];

    var Cody = new DesignSpecialist('Cody', 'Cody Glen', 'codyglen@berkeley.edu');
    var Chris = new DesignSpecialist('Chris', 'Chris Parsell', 'cparsell@berkeley.edu');
    var Arianna = new StudentSupervisor('Arianna', 'Arianna Nihn', 'ariannanihn@berkeley.edu');
    var Staff = new StudentSupervisor('Staff', 'Staff', 'jacobsprojectsupport@berkeley.edu');
    var Joey = new Manager('Joey','Joey Gottbrath','joeygottbrath@berkeley.edu');
    DSList.push(Cody, Chris, Arianna, Staff, Joey);
    
    var message = [];
    message.push('Employee Count : ' + DSList.length);
    Logger.log(message);
    
    DSList.forEach(DS => message.push('Name: ' + DS.name + ' Email: ' + DS.email + ' Link: ' + DS.link + ' Type: ' + DS.type + ' Admin: ' + DS.admin));
    return new Promise(resolve => {
        Logger.log(DSList);
        resolve(DSList);
    })
}






/**
 * ----------------------------------------------------------------------------------------------------------------
 * Design Specialist Class
 */
class DesignSpecialist
{
  constructor(name, fullname, email, link)
  {
    this._name = name;
    this._fullname = fullname;
    this._email = email;
    var link;
    this._type = 'Design Specialist';
    this._admin = true;
  }
  get name() { return this._name; }
  set name(x) { this._name = x; }
  get fullname() { return this._fullname; }
  set fullname(x) { this._fullname = x; }
  get email() { return this._email; }
  set email(x) { this._email = x; }
  get link() { return '<a href = "' + this._email + '">' + this._email + '</a>'; }
  get type() { return this._type; }
  get admin() { return this._admin; }
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * SS Class - child of DS Class
 */
class StudentSupervisor extends DesignSpecialist
{
  constructor(name, fullname, email)
  {
    // The reserved 'super' keyword is for making super-constructor calls and allows access to parent methods.
    super(name, fullname, email);
    // Note: In derived classes, super() must be called before you can use 'this'. Leaving this out will cause a reference error.
    this._name = name;
    this._fullname = fullname;
    this._email = email;
    var link;
    this._type = 'Student Supervisor';
    this._admin = false;
  }
  get name() { return this._name; }
  set name(x) { this._name = x; }
  get fullname() { return this._fullname; }
  set fullname(x) { this._fullname = x; }
  get email() { return this._email; }
  set email(x) { this._email = x; }
  get link() { return '<a href = "' + this._email + '">' + this._email + '</a>'; }
  get type() { return this._type; }
  get admin() { return this._admin; }
}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Manager Class - child of DS Class
 */
class Manager extends DesignSpecialist 
{ 
  constructor(name, fullname, email) 
  {
    super(name, fullname, email);
    this._name = name;
    this._fullname = fullname;
    this._email = email;
    var link;
    this._type = 'Manager';
    this._admin = true;
  }
  get name() { return this._name; }
  set name(x) { this._name = x; }
  get fullname() { return this._fullname; }
  set fullname(x) { this._fullname = x; }
  get email() { return this._email; }
  set email(x) { this._email = x; }
  get link() { return '<a href = "' + this._email + '">' + this._email + '</a>'; }
  get type() { return this._type; }
  get admin() { return this._admin; }
}



const roles = {
	DS: "Design Specialist",
	SS: "Student Supervisor",
	MA: "Manager",
}

/**
 * ----------------------------------------------------------------------------------------------------------------
 * Design Specialist Class
 */
class TestDS
{
  constructor(name, fullname, email)
  {
    this.name = name;
    this.fullname = fullname;
    this.email = email;
    this.link = `<a href = "${this.email}">${this.email}</a>`;
    this.type = 'Design Specialist';
    this.admin = true;
  }
  set setName(x) { this.name = x; }
  set setFullname(x) { this.fullname = x; }
  set setEmail(x) { this.email = x; }
  set setType(x) { this.type = x; }
  set setAdmin(x) { this.admin = x }
}

var _unitTestMakeDS = async () => {
    let Mike = await new TestDS('Mike', 'Mike Testa', 'miketesta@berkeley.edu');
    Logger.log(`${Mike.toString()}`)

    Logger.log(`Admin : ${Mike.admin}, Type : ${Mike.type}`);
}











