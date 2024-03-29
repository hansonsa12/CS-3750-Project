﻿namespace final_project.Models.User
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User : UserInfo
    {
        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(128)")]
        public string Salt { get; set; }

        public List<Transaction> Transactions { get; set; }

        public void UpdateInfo(UserInfo newInfo)
        {
            this.FirstName = newInfo.FirstName;
            this.LastName = newInfo.LastName;
            this.PhoneNumber = newInfo.PhoneNumber;
            this.Address = newInfo.Address;
            this.ProfileLinks = newInfo.ProfileLinks;
            this.Biography = newInfo.Biography;
        }
    }

    /* "View Only" models */
    public class UserInfo
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName = "varchar(60)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "varchar(60)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName = "varchar(255)")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public DateTime BirthDay { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public string AccountType { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "text")]
        public string Biography { get; set; }

        public virtual Address Address { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string ProfilePicName { get; set; }

        public ICollection<ProfileLink> ProfileLinks { get; set; }

        public UserInfo() { }

        public UserInfo(User user)
        {
            this.UserId = user.UserId;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.BirthDay = user.BirthDay;
            this.AccountType = user.AccountType;
            this.PhoneNumber = user.PhoneNumber;
            this.Address = user.Address;
            this.ProfilePicName = user.ProfilePicName;
            this.ProfileLinks = user.ProfileLinks;
            this.Biography = user.Biography;
        }
    }


    public class LoginInfo
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}