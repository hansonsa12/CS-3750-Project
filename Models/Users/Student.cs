namespace final_project.Models.User
{
    using System.Collections.Generic;
    using final_project.Models.Course;

    public class Student : User
    {
        public ICollection<Course> Registrations { get; set; }
    }

}