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
    using final_project.User.Models;
    using final_project.Controllers.Helpers;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LMSContext _context;
        private readonly JWTConfigs _jwtConfigs;
        private readonly AuthHelpers authHelpers;
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
            authHelpers = new AuthHelpers();
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
                /* * Search for email/password combination. If no user is found
                 * an InvalidOperation is thrown due to First() being called on 
                 * an empty list */
                var hashedPassword = user.Password;
                var foundUser = (await _context.Users
                    .Where(x => x.Email == user.Email)
                    .Where(x => x.Password.Equals(hashedPassword))
                    .ToListAsync()).First();

                /* Create and return a json web token */
                string token = await authHelpers.CreateJsonWebToken(_jwtConfigs, foundUser);
                return Ok(new
                {
                    user = JsonConvert.SerializeObject(new BasicUserInfo(foundUser), new JsonSerializerSettings
                    {
                        ContractResolver = contractResolver,
                        Formatting = Formatting.Indented
                    }),
                    authToken = token
                });
            }
            catch (InvalidOperationException)
            {
                // User not found, so return error.
                return StatusCode(401);
            }

        }

        [HttpPost("signup")]
        public async Task<IActionResult> PostSignUp([FromBody] User user)
        {
            // hash password
            user.Password = user.Password;

            // store user and hashed password in database
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            string token = await authHelpers.CreateJsonWebToken(_jwtConfigs, user);
            return Ok(new
            {
                user = JsonConvert.SerializeObject(new BasicUserInfo(user), new JsonSerializerSettings
                {
                    ContractResolver = contractResolver,
                    Formatting = Formatting.Indented
                }),
                authToken = token
            });
        }
    }
}
