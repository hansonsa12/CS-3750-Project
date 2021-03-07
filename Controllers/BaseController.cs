namespace final_project.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json.Serialization;
    using final_project.Data;
    using Newtonsoft.Json;

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
            //     NamingStrategy = new CamelCaseNamingStrategy()
            // };
        }

        // protected object SerializeObject(object obj){
        //     return JsonConvert.SerializeObject(obj, new JsonSerializerSettings {
        //         ContractResolver = contractResolver,
        //         Formatting = Formatting.Indented
        //     });
        // }

    }
}
