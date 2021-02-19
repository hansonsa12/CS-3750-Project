﻿namespace final_project.User.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class BasicUserInfo
    {
        [Required]
        public int ID { get; set; }

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

        public BasicUserInfo() { }

        public BasicUserInfo (User user)
        {
            this.ID = user.ID;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.BirthDay = user.BirthDay;
            this.AccountType = user.AccountType;
        }
    }
}