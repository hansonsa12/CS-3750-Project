using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace final_project.Models.User
{
    public class ProfileLink {
        public int ProfileLinkId { get; set; }

        [Required]
        [Column(TypeName="varchar(255)")]
        public string Link { get; set; }

        [Column(TypeName="varchar(60)")]
        public string Title { get; set; }

        public int UserId { get; set; }
    }
}