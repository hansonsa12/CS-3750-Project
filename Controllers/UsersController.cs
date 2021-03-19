namespace final_project.Controllers
{
    using System;
    using System.Threading.Tasks;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using final_project.Controllers.Helpers;
    using System.Diagnostics;
    using System.Linq;
    using Microsoft.Extensions.Options;

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
        

        [Authorize]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] User user){
            Debug.WriteLine("Inside UserController");
            Console.WriteLine("Inside UserController");
            User foundUser = await 
            AuthHelpers.GetCurrentUser(_context, User);
            if(foundUser.UserId != user.UserId){
                return StatusCode(401); // forbidden
            }
            try
            {
                // Do coode for updating user info
            foundUser.PhoneNumber = "555-555-0124";
            user.PhoneNumber = "555-555-0125";
            //await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }

            return Ok();

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