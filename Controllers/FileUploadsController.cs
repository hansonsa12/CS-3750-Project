using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using final_project.Data;
using final_project.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using final_project.Models;

namespace final_project.Controllers
{
    public class FileUploadsController : BaseController
    {
        public FileUploadsController(LMSContext context)
            :base(context)
        {
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostFileUpload([FromBody] FileUpload fileUpload)
        {
            /* https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-5.0#upload-small-files-with-buffered-model-binding-to-physical-storage */
            int userId = base.GetCurrentUserId();
            IFormFile formFile = fileUpload.File;

            var filePath = Path.Combine("uploads", $"u{userId.ToString()}");
            Directory.CreateDirectory(filePath);
            string fileName = Path.GetRandomFileName() + Path.GetExtension(formFile.FileName);
            filePath = Path.Combine(filePath, fileName);

            using (var stream = System.IO.File.Create(filePath)) {
                await formFile.CopyToAsync(stream);
            }

            return Ok();
        }

        // [HttpGet("")]
        // public async Task<ActionResult<IEnumerable<TModel>>> GetTModels()
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return new List<TModel> { };
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<TModel>> GetTModelById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }


        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutTModel(int id, TModel model)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<TModel>> DeleteTModelById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}