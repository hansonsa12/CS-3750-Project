namespace final_project.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Controllers.Helpers;
    using final_project.Data;
    using final_project.Models.Course;
    using final_project.Models.User;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("api/[controller]")]

    public class RegistrationsController : ControllerBase
    {

        private readonly LMSContext _context;
        public RegistrationsController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetRegistrations()
        {
            try
            {
                int studentId = AuthHelpers.GetCurrentUserId(User);
                Student student = await _context.Students.Where((s) => s.UserId == studentId)
                    .Include((s) => s.Registrations).FirstOrDefaultAsync();
                if (student == null)
                {
                    return StatusCode(404, new { error = "Student not found" });
                }

                return Ok(student.Registrations);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }

        }

        [Authorize]
        [HttpPost("{courseId}")]
        public async Task<IActionResult> RegisterForCourse(int courseId)
        {
            try
            {
                //await _context.Courses.AddAsync(course);
                Course courseToAdd = await _context.Courses.FindAsync(courseId);
                if (courseToAdd == null)
                {
                    return StatusCode(404, new { error = "Course not found" });
                }

                int studentId = AuthHelpers.GetCurrentUserId(User);
                Student student = await _context.Students.Where((s) => s.UserId == studentId)
                    .Include(s => s.Registrations).Include(s => s.Transactions)
                    .FirstOrDefaultAsync();

                if (student == null)
                {
                    return StatusCode(404, new { error = "Student not found" });
                }
                student.Registrations.Add(courseToAdd);

                student.Transactions.Add(new Charge(courseToAdd));

                await _context.SaveChangesAsync();

                return Ok(student.Registrations);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DropCourse(int courseId)
        {
            try
            {
                Course courseToRemove = await _context.Courses.FindAsync(courseId);
                if (courseToRemove == null)
                {
                    return StatusCode(404, new { error = "Course not found" });
                }

                int studentId = AuthHelpers.GetCurrentUserId(User);
                Student student = await _context.Students.Where((s) => s.UserId == studentId)
                    .Include(s => s.Registrations).Include(s => s.Transactions)
                    .FirstOrDefaultAsync();

                if (student == null)
                {
                    return StatusCode(404, new { error = "Student not found" });
                }
                student.Registrations.Remove(courseToRemove);
                student.Transactions.RemoveAll(t => t.CourseId == courseToRemove.CourseId);

                await _context.SaveChangesAsync();

                return Ok(student.Registrations);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }
    }
}