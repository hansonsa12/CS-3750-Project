namespace final_project.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Controllers.Helpers;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class AuthController : BaseController
    {
        private readonly JWTConfigs _jwtConfigs;
        private readonly AuthHelpers AuthHelpers;

        public AuthController(LMSContext context, IOptions<JWTConfigs> jwtConfigs)
            : base(context)
        {
            _jwtConfigs = jwtConfigs.Value;
            AuthHelpers = new AuthHelpers();
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginInfo user)
        {
            try
            {

                /* Search for user with specified email and verify the provided password is correct */
                User foundUser = _context.Users.Where(u => u.Email.Equals(user.Email)).First();
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
            catch (Exception)
            {
                // User not found, so return error.
                return StatusCode(401);
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
