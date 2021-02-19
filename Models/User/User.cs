namespace final_project.User.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User : BasicUserInfo
    {
        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string Password { get; set; }
        
        [Column(TypeName = "nvarchar(128)")]
        public string Salt { get; set; }
    }
}
