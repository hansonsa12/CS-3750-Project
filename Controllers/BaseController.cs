namespace final_project.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using final_project.Data;
    using final_project.Models.User;
    using System;
    using System.Security.Claims;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        protected readonly LMSContext _context;
        // private readonly DefaultContractResolver contractResolver;

        public BaseController(LMSContext context)
        {
            _context = context;
            // contractResolver = new DefaultContractResolver
            // { // This is to make .NET objects return in lowerCamelCase instead of UpperCamelCase (PascalCase)
        }

        public async Task<User> GetCurrentUser() {
            int userId = GetCurrentUserId();
            User foundUser = await _context.Users.Include(u => u.Address)
                .Include(u => u.ProfileLinks).FirstOrDefaultAsync(u => u.UserId == userId);
            return foundUser;
        }        

        public int GetCurrentUserId() {
            return Int32.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        }        
        
        // protected object SerializeObject(object obj){
        //     return JsonConvert.SerializeObject(obj, new JsonSerializerSettings {
        //         ContractResolver = contractResolver,
        //         Formatting = Formatting.Indented
        //     });
        // }

    }
}
