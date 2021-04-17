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

        [Column(TypeName = "varchar(60)")]
        public string FileName { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string Submission { get; set; }

        public DateTime SubmittedAt { get; set; }

        public int? ReceivedScore { get; set; }

        public DateTime? GradedAt { get; set; }

        [Column(TypeName = "text")]
        public string InstructorFeedback { get; set; }


        public void GradeSubmission(AssignmentSubmission assignmentSubmission)
        {
            this.ReceivedScore = assignmentSubmission.ReceivedScore;
            this.GradedAt = DateTime.Now;
            this.InstructorFeedback = assignmentSubmission.InstructorFeedback;
        }
    }
}