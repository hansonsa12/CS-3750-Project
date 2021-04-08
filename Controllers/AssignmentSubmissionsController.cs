using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using final_project.Models;
using final_project.Models.Course;
using final_project.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using final_project.Controllers.Helpers;
using final_project.Models.User;
// 
namespace final_project.Controllers
{
    [Route("api/assignments/{assignmentId}/submissions")]
    [ApiController]
    public class AssignmentSubmissionsController : ControllerBase
    {
        private readonly LMSContext _context;
        public AssignmentSubmissionsController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetSubmissions(int assignmentId)
        {
            if ((await AuthHelpers.GetCurrentUser(_context, User)) is Instructor i)
            {
                var submissions = await _context.AssignmentSubmissions.Where(
                    s => s.AssignmentId == assignmentId).ToListAsync();
                return Ok(submissions);
            }
            else
            {
                return Unauthorized(new
                {
                    error = "You do not have permission to view these assignment submissions."
                });
            }

        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetSubmissionById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }

        [HttpPost]
        public async Task<IActionResult> PostSubmission(int assignmentId,
            [FromBody] AssignmentSubmission submission)
        {
            try
            {
                submission.SubmittedAt = DateTime.Now;
                await _context.AssignmentSubmissions.AddAsync(submission);
                await _context.SaveChangesAsync();
                return Ok(submission);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutSubmission(int id, AssignmentSubmission model)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return NoContent();
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteSubmissionById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}