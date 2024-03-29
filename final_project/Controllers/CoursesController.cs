
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
    using Newtonsoft.Json.Linq;

    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly LMSContext _context;
        public CoursesController(LMSContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostCourse([FromBody] Course course)
        {
            try
            {
                await _context.Courses.AddAsync(course);
                await _context.SaveChangesAsync();
                return Ok(course);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetInstructorCourses()
        {
            int userId = AuthHelpers.GetCurrentUserId(User);
            var courses = await _context.Courses.Include(c => c.Instructor)
                .Where(c => c.InstructorId == userId)
                .Include(c => c.Assignment)
                .ToListAsync();
            // TODO Ky Filter out instructor info so it only returns FirstName and LastName
            // var courses = await (from course in _context.Set<Course>()
            //               join instructor in _context.Set<Instructor>()
            //                 on new { Id = course.InstructorId }
            //                 equals new { Id = instructor.UserId }
            //               select new { course, instructor = new { FirstName = instructor.FirstName,
            //                  LastName = instructor.LastName}}).ToListAsync();
            return Ok(courses);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _context.Courses.Include(c => c.Instructor)
                .Include(c => c.Assignment)
                .ToListAsync();
            return Ok(courses);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCourse([FromBody] Course updatedInfo)
        {
            try
            {
                Course course = await _context.Courses.FindAsync(updatedInfo.CourseId);
                if (course.InstructorId != AuthHelpers.GetCurrentUserId(User))
                {
                    return Unauthorized(new { error = "You do not have permission to do that." });
                }
                course.UpdateInfo(updatedInfo);
                await _context.SaveChangesAsync();
                return Ok(course);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourseById(int id)
        {
            try
            {
                Course course = await _context.Courses.FindAsync(id);
                if (course == null)
                {
                    return NotFound();
                }
                else if (course.InstructorId != AuthHelpers.GetCurrentUserId(User))
                {
                    return Unauthorized(new { error = "You do not have permission to do that." });
                }
                else
                {
                    // delete course
                    _context.Courses.Remove(course);
                    await _context.SaveChangesAsync();
                }
                return Ok(course);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Course>> GetCourseById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }


    }
}