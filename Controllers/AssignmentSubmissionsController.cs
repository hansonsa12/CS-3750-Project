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
                    s => s.AssignmentId == assignmentId).Include(s => s.Student)
                    .ToListAsync();
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

        [Authorize]
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

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserSubmission(int assignmentId,
            int userId)
        {
            try
            {
                User currentUser = await AuthHelpers.GetCurrentUser(_context, User);
                if (currentUser is Instructor i || (currentUser is Student s && s.UserId == userId))
                {
                    var submission = await _context.AssignmentSubmissions
                        .Where(s => s.AssignmentId == assignmentId && s.StudentId == userId)
                        .Include(s => s.Assignment)
                        .FirstOrDefaultAsync();
                    submission.Student.Password = null;
                    submission.Student.Salt = null;
                    submission.Assignment.AssignmentSubmissions = null;

                    return Ok(submission);
                }
                else
                {
                    return Unauthorized("You do not have permission to view this submission");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut("~/api/submissions")]
        public async Task<IActionResult> UpdateSubmission([FromBody] AssignmentSubmission updatedInfo)
        {
            try
            {
                AssignmentSubmission assignment = await _context.AssignmentSubmissions.FindAsync(updatedInfo.AssignmentSubmissionId);
                assignment.GradeSubmission(updatedInfo);
                await _context.SaveChangesAsync();
                return Ok(assignment);

            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }
 

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteSubmissionById(int id)
        // {
        //     // TODO: Your code here
        //     await Task.Yield();

        //     return null;
        // }
    }
}