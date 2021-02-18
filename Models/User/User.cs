namespace final_project.User.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User : BasicUserInfo
    {
        [Required]
        [Column(TypeName = "varchar(60)")]
        public string Password { get; set; }
    }
}
