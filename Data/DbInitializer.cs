namespace final_project.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public static class DbInitializer
    {
        public static void Initialize(LMSContext context)
        {
            context.Database.EnsureCreated();

            // Look for users
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }
        }
    }
}
