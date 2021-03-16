namespace final_project.Controllers
{
    using System.Threading.Tasks;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using final_project.Controllers.Helpers;

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly LMSContext _context;

        public UsersController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<IActionResult> GetLoggedInUserInfo()
        {
            User foundUser = await AuthHelpers.GetCurrentUser(_context, User);
            return Ok(new UserInfo(foundUser));
        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return new List<User> { };
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<User>> GetUserById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditUser(int id, User model)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<User>> DeleteUserById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}