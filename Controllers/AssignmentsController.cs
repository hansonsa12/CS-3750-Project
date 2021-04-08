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
    [Route("api/courses/{courseId}/[controller]")]
    public class AssignmentsController : ControllerBase
    {
        private readonly LMSContext _context;
        public AssignmentsController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostAssignment([FromBody] Assignment assignment)
        {
            try
            {
                await _context.Assignments.AddAsync(assignment);
                await _context.SaveChangesAsync();
                return Ok(assignment);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAssignments(int courseId)
        {
            var assignments = await _context.Assignments.Where(a => a.CourseId == courseId)
                .ToListAsync();
            return Ok(assignments);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateAssignment([FromBody] Assignment updatedInfo)
        {
            try
            {
                Assignment assignment = await _context.Assignments.FindAsync(updatedInfo.AssignmentId);
                Course course = await _context.Courses.FindAsync(updatedInfo.CourseId);
                if (course.InstructorId != AuthHelpers.GetCurrentUserId(User))
                {
                    return Unauthorized(new { error = "You do not have permission to update this assignment." });
                }
                assignment.UpdateInfo(updatedInfo);
                await _context.SaveChangesAsync();
                return Ok(assignment);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpGet("~/api/assignments/{id}")]
        public async Task<ActionResult<Assignment>> GetAssignmentById(int courseId, int id)
        {
            try
            {
                Assignment assignment = await _context.Assignments
                    .Include(a => a.AssignmentSubmissions).Where(a => a.AssignmentId == id)
                    .FirstOrDefaultAsync();
                if (assignment == null)
                {
                    return NotFound();
                }

                return Ok(assignment);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignmentById(int id)
        {
            try
            {
                Assignment assignment = await _context.Assignments.FindAsync(id);
                Course course = await _context.Courses.FindAsync(assignment.CourseId);
                if (assignment == null)
                {
                    return NotFound();
                }
                else if (course.InstructorId != AuthHelpers.GetCurrentUserId(User))
                {
                    return Unauthorized(new { error = "You do not have permission to delete this assignment" });
                }
                else
                {
                    // delete assignment
                    _context.Assignments.Remove(assignment);
                    await _context.SaveChangesAsync();
                }

                return Ok(assignment);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }
    }
}

