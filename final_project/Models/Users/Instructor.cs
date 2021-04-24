namespace final_project.Models.User
{
    using System.Collections.Generic;
    using final_project.Models.Course;

    public class Instructor : User
    {
        public List<Course> Courses { get; set; }
    }

}