namespace final_project.Controllers
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using Microsoft.EntityFrameworkCore;

    public class UsersController : BaseController
    {
        public UsersController(LMSContext context)
            : base(context)
        {
        }

        

        [Authorize]
        [HttpGet("current")]
        public async Task<IActionResult> GetLoggedInUserInfo()
        {
            int userId = Int32.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            User foundUser = await _context.Users.Include(u => u.Address)
                .Include(u => u.ProfileLinks).FirstOrDefaultAsync(u => u.UserId == userId);
            return Ok(new UserInfo(foundUser));
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(int id, User model)
        {
            // TODO: Your code here
            await Task.Yield();

            return NoContent();
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


        // [HttpDelete("{id}")]
        // public async Task<ActionResult<User>> DeleteUserById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}