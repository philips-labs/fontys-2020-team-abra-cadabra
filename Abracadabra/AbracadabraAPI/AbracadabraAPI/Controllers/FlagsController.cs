using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Data;
using AbracadabraAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlagsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;

        public FlagsController(AbracadabraContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // POST: api/FlaggedQuestions
        [HttpPost("{id}")]
        [Authorize]
        public async Task<ActionResult> FlagQuestion(int questionId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            var flaggedQuestion = new FlaggedQuestion
            {
                UserId = user.Id.ToString(),
                QuestionId = questionId,
            };

            _context.FlaggedQuestions.Add(flaggedQuestion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/FlaggedAnswers
        [HttpPost("{id}")]
        [Authorize]
        public async Task<ActionResult> FlagAnswer(int answerId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            var flaggedAnswer = new FlaggedAnswer
            {
                UserId = user.Id.ToString(),
                AnswerId = answerId,
            };

            _context.FlaggedAnswers.Add(flaggedAnswer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
