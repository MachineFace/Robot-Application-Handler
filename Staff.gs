
/**
 * ----------------------------------------------------------------------------------------------------------------
 * Class for Creating a Design Specialist Employee
 */
class DesignSpecialist {
  constructor({
    name = `DS`, 
    fullname = `Design Specialist`, 
    email = SERVICE_EMAIL,
  }) {
    this.name = name;
    this.fullname = fullname;
    this.email = email;
    this.link = `<a href="${this.email}">${this.email}</a>`;
    this.type = `Design Specialist`;
    this.isAdmin = true;
    this.shortCode = `DS`;
  }
  
  get() {
    return {
      name : this.name,
      fullname : this.fullname,
      email : this.email,
      link : this.link,
      type : this.type,
      isAdmin : this.isAdmin,
      shortCode : this.shortCode,
    }
  }

}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * SS Class - child of DS Class
 * Note: In derived classes, super() must be called before you can use 'this'. Leaving this out will cause a reference error.
 */
class StudentSupervisor extends DesignSpecialist {
  constructor({
    name = `SS`, 
    fullname = `Student Supervisor`, 
    email = SERVICE_EMAIL,
  }) {
    // The reserved 'super' keyword is for making super-constructor calls and allows access to parent methods.
    super(name, fullname, email);
    this.name = name;
    this.fullname = fullname;
    this.email = email;
    this.link = `<a href="${this.email}">${this.email}</a>`;
    this.type = `Student Supervisor`;
    this.isAdmin = false;
    this.shortCode = `SS`;
  }

  get() {
    return {
      name : this.name,
      fullname : this.fullname,
      email : this.email,
      link : this.link,
      type : this.type,
      isAdmin : this.isAdmin,
      shortCode : this.shortCode,
    }
  }

}


/**
 * ----------------------------------------------------------------------------------------------------------------
 * Manager Class - child of DS Class
 */
class Manager extends DesignSpecialist { 
  constructor({
    name = `MA`, 
    fullname = `Manager`, 
    email = SERVICE_EMAIL,
  }) 
  {
    super(name, fullname, email);
    this.name = name;
    this.fullname = fullname;
    this.email = email;
    this.link = `<a href="${this.email}">${this.email}</a>`;
    this.type = `Manager`;
    this.isAdmin = true;
    this.shortCode = `MA`;
  }

  get() {
    return {
      name : this.name,
      fullname : this.fullname,
      email : this.email,
      link : this.link,
      type : this.type,
      isAdmin : this.isAdmin,
      shortCode : this.shortCode,
    }
  }
  
}



/**
 * ----------------------------------------------------------------------------------------------------------------
 * Return Staff Email as a string.
 */
const StaffEmailAsString = () => {
  let emaillist = SHEETS.StaffList.getRange(2, 3, SHEETS.StaffList.getLastRow() - 1, 1).getValues();
  return emaillist.toString();
}





/**
 * -----------------------------------------------------------------------------------------------------------------
 * Class for Building Staff
 */
class StaffBuilder {
  constructor() {
    this.staff = {};
    this.MakeStaff();
  }

  MakeStaff () {
    const data = SHEETS.StaffList.getRange(2, 1, SHEETS.StaffList.getLastRow() -1, 5).getValues();
    data.forEach( item => {
      let name = item[0], fullname = item[1], email = item[2], emaillink = item[3], type = item[4];
      if(type === `DS`) this.staff[name] = new DesignSpecialist({ name : name, fullname : fullname, email : email, });
      if(type === `SS`) this.staff[name] = new StudentSupervisor({ name : name, fullname : fullname, email : email, });
      if(type === `MA`) this.staff[name] = new Manager({ name : name, fullname : fullname, email : email, });
    });
  }

  get () {
    return this.staff;
  }

}



/**
 * Unit test for making Staff
 */
const _testStaff = () => {
  const staff = new StaffBuilder().get();
  for(const [name, values] of Object.entries(staff)) {
    console.info(`${name} ----> First Name :${values.name}, Full : ${values.fullname} ~~ ${JSON.stringify(values)}`)
  }
  const cody = staff.Cody;
  console.info(cody)
}











