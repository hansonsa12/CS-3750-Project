
namespace final_project.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Data;
    using final_project.Models.Course;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    public class CoursesController : BaseController
    {
        public CoursesController(LMSContext context)
            : base(context)
        {
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostCourse([FromBody] Course course)
        {
            try{
                await _context.Courses.AddAsync(course);
                await _context.SaveChangesAsync();
                return Ok(course);
            } catch (Exception e) {
                return StatusCode(500, new { error = e });
            }
        }

        // [Authorize]
        // [HttpGet("")]
        // public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        // {
        //     var courses = await _context.Courses.ToListAsync<Course>();
        //     return courses;
        // }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Course>> GetCourseById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutCourse(int id, Course course)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<Course>> DeleteCourseById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}