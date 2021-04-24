using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using final_project.Data;
using Microsoft.AspNetCore.Mvc;
using final_project.Models.User;
using Microsoft.AspNetCore.Authorization;
using final_project.Controllers.Helpers;

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly LMSContext _context;

        public TransactionController(LMSContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostTransaction([FromBody] Transaction transaction)
        {
            try
            {
                User currentUser = await AuthHelpers.GetCurrentUser(_context, base.User);
                currentUser.Transactions.Add(transaction);

                return Ok(transaction);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            try
            {
                int userId = AuthHelpers.GetCurrentUserId(base.User);
                var transactions = _context.Transactions.Where(t => t.UserId == userId).ToList();

                return Ok(transactions);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e });
            }
        }
    }
}