namespace final_project.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Controllers.Helpers;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LMSContext _context;
        private readonly JWTConfigs _jwtConfigs;

        public AuthController(LMSContext context, IOptions<JWTConfigs> jwtConfigs)
        {
            _jwtConfigs = jwtConfigs.Value;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginInfo user)
        {
            try
            {

                /* Search for user with specified email and verify the provided password is correct */
                User foundUser = await _context.Users.Where(u => u.Email.Equals(user.Email)).FirstOrDefaultAsync();
                if (foundUser == null) {
                    return StatusCode(404, new {error = "User with email does not exist"});
                }
                HashResult hashResult = AuthHelpers.HashPassword(user.Password, foundUser.Salt);

                if (foundUser.Password.Equals(hashResult.Password))
                {
                    /* Create and return a json web token */
                    string token = await AuthHelpers.CreateJsonWebToken(_jwtConfigs, foundUser);
                    
                    return Ok(new
                    {
                        authToken = token
                    });
                }
                else
                {
                    return StatusCode(401);
                }
            }
            catch (Exception e)
            {
                // Something else happened, so return error.
                return StatusCode(500, new { error = e.Message });
            }

        }

        [HttpPost("signup")]
        public async Task<IActionResult> PostSignUp([FromBody] User user)
        {
            // hash password
            HashResult hashResult = AuthHelpers.HashPassword(user.Password);
            user.Password = hashResult.Password;
            user.Salt = hashResult.Salt;

            // store user and hashed password in database
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            string token = await AuthHelpers.CreateJsonWebToken(_jwtConfigs, user);

            return Ok(new
            {
                authToken = token
            });
        }
    }
}
