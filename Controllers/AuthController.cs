namespace final_project.AuthController
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Data;
    using final_project.Models.User;
    using final_project.Controllers.Helpers;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LMSContext _context;
        private readonly JWTConfigs _jwtConfigs;
        private readonly AuthHelpers AuthHelpers;
        private readonly DefaultContractResolver contractResolver;

        [Authorize]
        [HttpGet("hi")]
        public string Test()
        {
            return "Hi there";
        }

        public AuthController(LMSContext context, IOptions<JWTConfigs> jwtConfigs)
        {
            _context = context;
            _jwtConfigs = jwtConfigs.Value;
            AuthHelpers = new AuthHelpers();
            contractResolver = new DefaultContractResolver
            { // This is to make .NET objects return in lowerCamelCase instead of UpperCamelCase (PascalCase)
                NamingStrategy = new CamelCaseNamingStrategy()
            };
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
                    foundUser.Password = null;
                    foundUser.Salt = null;
                    
                    return Ok(new
                    {
                        user = JsonConvert.SerializeObject(foundUser, new JsonSerializerSettings
                        {
                            ContractResolver = contractResolver,
                            Formatting = Formatting.Indented
                        }),
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

            user.Password = null;
            user.Salt = null;

            return Ok(new
            {
                user = JsonConvert.SerializeObject(user, new JsonSerializerSettings
                {
                    ContractResolver = contractResolver,
                    Formatting = Formatting.Indented
                }),
                authToken = token
            });
        }
    }
}
