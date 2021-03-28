namespace final_project.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using final_project.Controllers.Helpers;
    using final_project.Data;
    using final_project.Models.Course;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("api/[controller]")]

    public class RegistrationController : ControllerBase
    {

        private readonly LMSContext _context;
        public RegistrationController(LMSContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterStudent(CourseStudent courseStudent){
            try{
                //await _context.
                await _context.SaveChangesAsync();
                return Ok(courseStudent);
            }
            catch(Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

/*
        [Authorize]
        [HttpPost]
        public async Task(IActionResult)RegisterStudent(){
            try
            {
                await _context.Courses.AddAsync(course);
                await _context.SaveChangesAsync();
                return Ok(course);
            } catch (Exception e) 
            {
                return StatusCode(500, new { error = e });
            }
        }
*/
    }
}