
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
        public int AmountInCents { get; set; }

        [Required]
        [Column(TypeName = "varchar(7)")]
        public string Type { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public static int PRICE_PER_CREDIT_IN_CENTS = 10_000;

        public Transaction()
        {
            this.CreatedAt = DateTime.Now;
        }
    }

    public class Charge : Transaction
    {
        public Charge() : base() { }
        public Charge(Course courseToChargeFor)
            : base()
        {
            base.CourseId = courseToChargeFor.CourseId;
            base.AmountInCents = courseToChargeFor.CreditHours * PRICE_PER_CREDIT_IN_CENTS;
            base.Description = $@"{courseToChargeFor.CourseNumber} - {courseToChargeFor.CourseName} course fee 
                ({courseToChargeFor.CreditHours} credits X ${PRICE_PER_CREDIT_IN_CENTS / 100}/credit)";
        }
    }


    public class Payment : Transaction
    {
        public Payment() : base() { base.Type = "payment"; }
    }
}