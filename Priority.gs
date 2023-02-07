/**
 * ----------------------------------------------------------------------------------------------------------------
 * Class for Checking Priority
 * @param {string} email
 * @param {string} sid
 */
class Priority
{
  constructor({
    studentType : studentType = STUDENT_TYPES.researcher,
  }) {
    this.studentType = studentType;
    this.GetPriority();
    this.priority;
    this.cellcolor;
  }

  async GetPriority () {
    try {
      switch(this.studentType) {  
        case STUDENT_TYPES.researcher:
        case STUDENT_TYPES.desinv_faculty:
        case STUDENT_TYPES.afil_faculty:
        case STUDENT_TYPES.mdes_student:
        case STUDENT_TYPES.desinv_student:
          this.priority = 1;
          this.cellcolor = COLORS.green_light;
          break;     
        case STUDENT_TYPES.engineering_scholar:
        case STUDENT_TYPES.innovation_catalyst:
          this.priority = 2;
          this.cellcolor = COLORS.yellow_light;
          break;      
        case STUDENT_TYPES.jacobs_staff:
        case STUDENT_TYPES.jacobs_student:
        case STUDENT_TYPES.club:
          this.priority = 3;
          this.cellcolor = COLORS.orange_light;
          break;
        case STUDENT_TYPES.other:
        case STUDENT_TYPES.general_students:
          this.priority = 4;
          this.cellcolor = COLORS.red_light;
          break;      
        case undefined:
        case "":
          break;
      }
      console.info(`Student Type : ${this.studentType}, Priority : ${this.priority}, Color : ${this.cellcolor}`);
      // return priority;
      return await this.priority;
    } catch(err) {
      console.error(`${err} : Couldn't check or set priority for some reason...`);
      return 0;
    }
    
  }

  
}





/**
 * ----------------------------------------------------------------------------------------------------------------
 * TEST Priority
 * @param {string} studentType
 * @return {number} priority
 */
const _testPriority = () => {
  console.time(`Priority`);
  new Priority({ studentType : STUDENT_TYPES.jacobs_staff, });
  new Priority({ studentType : STUDENT_TYPES.other, })
  new Priority({ studentType : STUDENT_TYPES.jacobs_student, })
  new Priority({ studentType : STUDENT_TYPES.innovation_catalyst, })
  new Priority({ studentType : STUDENT_TYPES.desinv_student, })
  console.timeEnd(`Priority`);
}





