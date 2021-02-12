namespace FinalProject.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public enum AccountType
    {
        Instructor,
        Student,
    }

    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public DateTime BirthDay { get; set; }

        [Required]
        public AccountType AccountType { get; set; }
    }
}
