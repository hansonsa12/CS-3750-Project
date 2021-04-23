namespace final_project
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class JWTConfigs
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Secret { get; set; }
    }
}
