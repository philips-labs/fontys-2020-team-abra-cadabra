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
using Microsoft.EntityFrameworkCore;

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlaggedEntitiesController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FlaggedEntitiesController(AbracadabraContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this._userManager = userManager;
        }

        // POST: api/FlaggedQuestions
        [HttpPost("question/{questionId}")]
        [Authorize]
        public async Task<ActionResult> FlagQuestion(int questionId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            var flag = await _context.FlaggedQuestions.Where(x => x.UserId == user.Id && x.QuestionId == questionId).FirstOrDefaultAsync();
            if (flag != null)
            {
                return BadRequest("Question has already been flagged by the user.");
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
        [HttpPost("answer/{answerId}")]
        [Authorize]
        public async Task<ActionResult> FlagAnswer(int answerId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            var flag = await _context.FlaggedAnswers.Where(x => x.UserId == user.Id && x.AnswerId == answerId).FirstOrDefaultAsync();
            if (flag != null)
            {
                return BadRequest("Answer has already been flagged by the user.");
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

        // DELETE: api/FlaggedQuestions
        [HttpDelete("question/{questionId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UnflagQuestion(int questionId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            List<FlaggedQuestion> flaggedQuestions = await _context.FlaggedQuestions.Where(x => x.QuestionId == questionId).ToListAsync();
            if (flaggedQuestions == null)
            {
                return NotFound();
            }

            foreach (FlaggedQuestion question in flaggedQuestions)
            {
                _context.FlaggedQuestions.Remove(question);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/FlaggedAnswers
        [HttpDelete("answer/{answerId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UnflagAnswer(int answerId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            List<FlaggedAnswer> flaggedAnswers = await _context.FlaggedAnswers.Where(x => x.AnswerId == answerId).ToListAsync();
            if (flaggedAnswers == null)
            {
                return NotFound();
            }

            foreach (FlaggedAnswer answer in flaggedAnswers)
            {
                _context.FlaggedAnswers.Remove(answer);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
