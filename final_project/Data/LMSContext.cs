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
        public DbSet<ProfileLink> ProfileLinks { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Student> Students { get; set; }

        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<AssignmentSubmission> AssignmentSubmissions { get; set; }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Charge> Charges { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>()
                .HasDiscriminator(u => u.AccountType)
                .HasValue<Instructor>("instructor")
                .HasValue<Student>("student");

            modelBuilder.Entity<Transaction>()
                .HasDiscriminator(t => t.Type)
                .HasValue<Charge>("charge")
                .HasValue<Payment>("payment");
        }
    }
}
