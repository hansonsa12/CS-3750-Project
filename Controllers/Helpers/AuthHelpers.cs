namespace final_project.Controllers.Helpers
{
    using System;
    using System.Threading.Tasks;
    using final_project.User.Models;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.Security.Claims;

    public class AuthHelpers
    {

        /* Create and return a json web token */
        public async Task<String> CreateJsonWebToken(JWTConfigs jwt_configs, User user)
        {
            return await Task.Run(() =>
                {
                    var claims = new[] { new Claim(JwtRegisteredClaimNames.Sub, user.Email) };

                    var key = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwt_configs.Secret)
                        );
                    var algorithm = SecurityAlgorithms.HmacSha256;

                    var signingCredentials = new SigningCredentials(key, algorithm);

                    var token = new JwtSecurityToken(
                            jwt_configs.Issuer,
                            jwt_configs.Audience,
                            claims,
                            notBefore: DateTime.Now,
                            expires: DateTime.Now.AddHours(3),
                            signingCredentials
                        );

                    var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);

                    return tokenJson;
                });
        }
    }
}
