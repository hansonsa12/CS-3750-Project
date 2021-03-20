namespace final_project.Models.Course
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Assignment {
        public int AssignmentId { get; set; }


        [Required]
        public int CourseId { get; set; }

        [Required]
        [Column (TypeName = "varchar(60)")]
        public string Title { get; set; }

        [Column (TypeName = "text")]
        public string Description { get; set; }

        public int? MaxPoints { get; set; }
        public DateTime? DueDate { get; set; }

        [Required]
        [Column (TypeName = "varchar(10)")]
        public string AssignmentType { get; set; }



    }
}