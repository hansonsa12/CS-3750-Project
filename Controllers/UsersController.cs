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

        // [Authorize]
        // [HttpPost]
        // public async Task<IActionResult> UpdateUser([FromBody] User user) {
        //     User foundUser = await AuthHelpers.GetCurrentUser(_context, User);
        //     if (foundUser.UserId != user.UserId) {
        //         return StatusCode(401); // forbidden
        //     }

        //     // assign foundUser attributes to user attributes
        //     return Ok();
        // }
        
        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditUser(int id, User model)
        // {
        //     if(id != model.UserId)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(model).State = EntityState.Modified;

        //     try 
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch(DbUpdateConcurrencyException)
        //     {
        //         if(!UserExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //     return NoContent();
        // }


        // private bool UserExists(int id)
        // {
        //     _context.Users.AnyAsync(e=> e.UserId == id);
        //     //TODO: convert top line to return a bool
        //     return false;
        // }
        

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