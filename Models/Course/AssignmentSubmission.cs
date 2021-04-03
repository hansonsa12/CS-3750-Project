namespace final_project.Models.Course
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using final_project.Models.User;

    public class AssignmentSubmission
    {
        public int AssignmentSubmissionId { get; set; }

        [Required]
        public int AssignmentId { get; set; }
        public Assignment Assignment { get; set; }

        [Required]
        public int StudentId { get; set; }
        public Student Student { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string Submission { get; set; }

        public DateTime SubmittedAt { get; set; }

        [Required]
        public int? ReceivedScore { get; set; }
    }
}