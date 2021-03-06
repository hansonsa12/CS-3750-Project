namespace final_project.Models.User
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName="varchar(60)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName="varchar(60)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName="varchar(255)")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public DateTime BirthDay { get; set; }

        [Required]
        [Column(TypeName="varchar(10)")]
        public string AccountType { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string Password { get; set; }
        
        [Column(TypeName = "nvarchar(128)")]
        public string Salt { get; set; }

        [Column(TypeName="varchar(15)")]
        public string PhoneNumber { get; set; }

        public int? AddressId { get; set; }

        public virtual Address Address { get; set; }

        public ICollection<FileUpload> FileUploads { get; set; }
        public ICollection<ProfileLink> ProfileLinks { get; set; }
    }

    public class LoginInfo
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}