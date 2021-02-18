namespace final_project.User.Models
{
    using System.ComponentModel.DataAnnotations;

    public class LoginInfo
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
