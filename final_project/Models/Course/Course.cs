namespace final_project.Models.Course
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using final_project.Models.User;

    public class Course
    {
        public int CourseId { get; set; }

        [Required]
        [Column(TypeName = "varchar(60)")]
        public string CourseName { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public string CourseNumber { get; set; }

        [Required]
        public int InstructorId { get; set; }
        public Instructor Instructor { get; set; }

        [Required]
        [Column(TypeName = "varchar(60)")]
        public string Department { get; set; }

        [Required]
        public int CreditHours { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string BuildingName { get; set; }

        [Column(TypeName = "varchar(10)")]
        public string RoomNumber { get; set; }

        [Column(TypeName = "varchar(5)")]
        public string MeetingDays { get; set; }

        [Column(TypeName = "varchar(8)")]
        public string StartTime { get; set; }

        [Column(TypeName = "varchar(8)")]
        public string EndTime { get; set; }

        public int? MaxCapacity { get; set; }

        // Student Registrations
        public ICollection<Student> Registrations { get; set; }
        public List<Assignment> Assignment { get; set; }

        public void UpdateInfo(Course updatedInfo){

            this.CourseName = updatedInfo.CourseName;
            this.CourseNumber = updatedInfo.CourseNumber;
            this.Department = updatedInfo.Department;
            this.CreditHours = updatedInfo.CreditHours;
            this.Description = updatedInfo.Description;
            this.BuildingName = updatedInfo.BuildingName;
            this.RoomNumber = updatedInfo.RoomNumber;
            this.MeetingDays = updatedInfo.MeetingDays;
            this.StartTime = updatedInfo.StartTime;
            this.EndTime = updatedInfo.EndTime;
            this.MaxCapacity = updatedInfo.MaxCapacity;
        }
    }
}
