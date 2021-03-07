namespace final_project.Data
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Models.User;
    using final_project.Models.Course;

    public class LMSContext : DbContext
    {
        public LMSContext(DbContextOptions<LMSContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<FileUpload> FileUploads { get; set; }
        public DbSet<ProfileLink> ProfileLinks { get; set; }

        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
