namespace final_project.Models.User
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class Address {
        public int AddressId { get; set; }

        [Column(TypeName="varchar(60)")]
        public string AddressOne { get; set; }

        [Column(TypeName="varchar(60)")]
        public string AddressTwo { get; set; }

        [Column(TypeName="varchar(40)")]
        public string City { get; set; }

        [Column(TypeName="varchar(20)")]
        public string State { get; set; }

        [Column(TypeName="varchar(10)")]
        public string ZipCode { get; set; }

        public virtual User AddressOwner { get; set; }
    }
}