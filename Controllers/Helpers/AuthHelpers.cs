namespace final_project.Controllers.Helpers
{
    using System;
    using System.Threading.Tasks;
    using final_project.Models.User;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using Microsoft.AspNetCore.Cryptography.KeyDerivation;

    public struct HashResult {
        public HashResult(string hashedPassword, string salt)
        {
            this.Password = hashedPassword;
            this.Salt = salt;
        }
        public string Salt { get; }
        public string Password { get; }
    }

    public class AuthHelpers
    {
        public static HashResult HashPassword(string password, string storedSalt = null)
        {
            /*** References ***
             * code example: https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-5.0
             * explanation of salt, pepper, and password hashing: https://www.youtube.com/watch?v=eicDtA9Yu-A
             ******************/

            byte[] salt;
            if (storedSalt == null)
            {
                salt = new byte[128 / 8]; // assign salt if it is null
                RandomNumberGenerator.Create().GetBytes(salt);
            }
            else
            {
                salt = Convert.FromBase64String(storedSalt);
            }

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8)
            );

            return new HashResult(hashedPassword, Convert.ToBase64String(salt));
        }

        /* Create and return a json web token */
        public static async Task<String> CreateJsonWebToken(JWTConfigs jwt_configs, User user)
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
