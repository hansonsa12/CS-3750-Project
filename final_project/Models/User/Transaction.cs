
namespace final_project.Models.User
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using final_project.Models.Course;

    public class Transaction
    {
        public int TransactionId { get; set; }

        public int UserId { get; set; }

        public int? CourseId { get; set; }

        [Required]
        public int Amount { get; set; }

        [Required]
        [Column(TypeName = "varchar(7)")]
        public string Type { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class Charge : Transaction { }


    public class Payment : Transaction { }
}