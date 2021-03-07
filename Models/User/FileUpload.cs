using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace final_project.Models.User
{
    public class FileUpload {
        public int FileUploadId { get; set; }

        [Required]
        [Column(TypeName="varchar(60)")]
        public string FileName { get; set; }

        [Required]
        [Column(TypeName="varchar(10)")]
        public string FileType { get; set; }

        public int UserId { get; set; }
        public User Owner { get; set; }
    }

    public class ProfilePic : FileUpload { }
}