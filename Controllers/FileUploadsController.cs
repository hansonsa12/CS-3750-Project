namespace final_project.Controllers
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using final_project.Controllers.Helpers;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadsController : ControllerBase
    {
        private readonly LMSContext _context;

        public FileUploadsController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("profilepic")]
        public async Task<IActionResult> PostFileUpload(IFormFile file)
        {
            /* https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-5.0#upload-small-files-with-buffered-model-binding-to-physical-storage */
            try {
                User user = await AuthHelpers.GetCurrentUser(_context, User);
                var filePath = AuthHelpers.GetUploadBasePath(user.UserId);

                /* delete existing profile pic */
                try {
                    System.IO.File.Delete(Path.Combine(filePath, user.ProfilePicName));
                } catch (Exception del) {
                    Console.Error.WriteLine(del);
                }

                /* add new profile pic */
                Directory.CreateDirectory(filePath);
                string extension = Path.GetExtension(file.FileName);
                string fileName = Path.GetRandomFileName() + extension;
                filePath = Path.Combine(filePath, fileName);

                using (var stream = System.IO.File.Create(filePath)) {
                    await file.CopyToAsync(stream);
                }

                user.ProfilePicName = fileName;
                await _context.SaveChangesAsync();

                return Ok(new { filePath = $"/{filePath.Replace("\\", "/")}", fileName });

            } catch (Exception e) {
                Console.Error.WriteLine(e);
                return StatusCode(500, new { error = e });
            }
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