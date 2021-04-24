namespace final_project.Tests.Shared
{
    using System;
    using System.Data.Common;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using final_project.Data;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;

    public class SharedDatabaseFixture : IDisposable
    {
        /* https://docs.microsoft.com/en-us/ef/core/testing/sharing-databases */
        private static readonly object _lock = new object();

        private static bool _databaseInitialized;

        public SharedDatabaseFixture()
        {
            Connection = new SqlConnection(@"Server=(localdb)\mssqllocaldb;Database=lms_test;ConnectRetryCount=0");

            Seed();

            Connection.Open();
        }

        public DbConnection Connection { get; }

        public LMSContext CreateContext(DbTransaction transaction = null)
        {
            var context = new LMSContext(new DbContextOptionsBuilder<LMSContext>().UseSqlServer(Connection).Options);

            if (transaction != null)
            {
                context.Database.UseTransaction(transaction);
            }

            return context;
        }

        private void Seed()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.Migrate();

                        Student student = new Student()
                        {
                            FirstName = "Billy",
                            LastName = "Student",
                            Email = "billy@student.com",
                            BirthDay = new DateTime(1995, 4, 23),
                            Password = "password"
                        };

                        Instructor instructor = new Instructor()
                        {
                            FirstName = "Joe",
                            LastName = "Instructor",
                            Email = "joe@instructor.com",
                            BirthDay = new DateTime(1980, 8, 16),
                            Password = "password"
                        };

                        context.Students.Add(student);
                        context.Instructors.Add(instructor);

                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }


        public void Dispose() => Connection.Dispose();
    }
}
