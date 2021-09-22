/**
 * ----------------------------------------------------------------------------------------------------------------
 * Parse
 * @param {e} event
 */
const Parse = async (e) => {
  //Create array summary of student's entry.
  var values = e.namedValues;
  
  //Parse Functions
  var name;
  var email;
  var studentType;
  var toxicity;
  var instructor;
    
  for (Key in values)
  {
    var label = Key;
    var data = values[Key];
    
    switch(label)
    {
      case 'Name':
        if(data != undefined || data != null || data != '')
        {
          name = data;
          break;
        }
        break;
      case 'Email Address':
        if(data != undefined || data != null || data != '')
        {
          email = data;
          break;
        }
        break;
      case 'Where are you in your academic journey?':
        if(data != undefined || data != null || data != '')
        {
          studentType = data;
          break;
        }
        break;
      case 'Is your project or process inherently messy, toxic, noxious, or otherwise unhealthy and would require additional support systems for the health and safety of those who work at the Jacobs Institute?':
        if(data != undefined || data != null || data != '')
        {
          toxicity = data;
          break;
        }
        break;
      case 'If you are a researcher, who is your PI?':
        if(data != undefined || data != null || data != '')
        {
          instructor = data;
          break;
        }
        break;
    } 
    //returns
    this.name = name;
    this.email = email;
    this.studentType = studentType;
    this.toxicity = toxicity;
    this.instructor = instructor;
    
  }
}