using System;
using System.Linq;
using System.Security.Claims;
using final_project.Data;
using final_project.Models.Course;
using final_project.Models.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace final_project.Tests.Shared
{
    public class TestHelper
    {
        public readonly LMSContext _context;
        public readonly ControllerBase _controller;

        public TestHelper(LMSContext context, ControllerBase controller)
        {
            _context = context;
            _controller = controller;
        }

        public bool Login(User user)
        {
            try
            {
                /* https://stackoverflow.com/questions/38557942/mocking-iprincipal-in-asp-net-core */
                var userPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
                }));

                _controller.ControllerContext = new ControllerContext()
                {
                    HttpContext = new DefaultHttpContext() { User = userPrincipal }
                };

                return true; // login successful

            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return false; // something went wrong
            }
        }

        public Course CreateACourse()
        {
            var course = new Course()
            {
                CourseName = "Advanced Database Programming",
                CourseNumber = "CS 3550",
                InstructorId = 2,
                Department = "Computer Science",
                CreditHours = 4,
                Description = "Learn how to do some advanced things with databases!",
                BuildingName = "Computer Science Building",
                RoomNumber = "CA 141",
                MeetingDays = "MWF",
                StartTime = "08:00 AM",
                EndTime = "11:30 AM",
                MaxCapacity = 30
            };

            _context.Courses.Add(course);
            _context.SaveChanges();

            return course;
        }

        public Student GetDefaultStudent()
        {
            return _context.Students.Include(s => s.Registrations).FirstOrDefault();

        }

        public Instructor GetDefaultInstructor()
        {
            return _context.Instructors.Include(i => i.Courses).FirstOrDefault();
        }
    }
}
