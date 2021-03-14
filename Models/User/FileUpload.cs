using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace final_project.Models.User
{
    public class FileUpload {
        [Required]
        public int AttachableId { get; set; }
        [Required]
        public string AttachableType { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }
}