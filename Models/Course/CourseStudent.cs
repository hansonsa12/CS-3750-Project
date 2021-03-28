namespace final_project.Models.Course
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using final_project.Models.User;
    

    public class CourseStudent
    {
        [Required]
        public int RegistrationsCourseId {get;set;}

        [Required]
        public int RegistrationUserId {get; set;} 
    
    public void UpdateInfo(CourseStudent cs){
        this.RegistrationsCourseId = cs.RegistrationsCourseId;
        this.RegistrationUserId = cs.RegistrationUserId;
    }
    
    }

}