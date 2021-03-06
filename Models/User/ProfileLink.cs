using System.ComponentModel.DataAnnotations.Schema;

namespace final_project.Models.User
{
    public class ProfileLink {
        public int ProfileLinkId { get; set; }

        [Column(TypeName="varchar(255)")]
        public string Link { get; set; }

        public int UserId { get; set; }
    }
}