using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Data;
using AbracadabraAPI.Models;
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotesController : Controller
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public VotesController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/votes/question/{questionId}
        [HttpGet("question/{questionId}")]
        [Authorize]
        public async Task<ActionResult<QuestionVote>> GetQuestionVote(int questionId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);

            if (user != null)
            {
                var questionVote = await _context.QuestionVotes.Where(x => x.QuestionId == questionId && x.UserId == user.Id).FirstOrDefaultAsync();
                if (questionVote == null)
                {
                    return NotFound();
                }
                return questionVote;
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/votes/question
        [HttpPost("question")]
        [Authorize]
        public async Task<IActionResult> PostQuestionVote(QuestionVoteViewModel model)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var question = await _context.Questions.Where(x => x.ID == model.QuestionId).FirstOrDefaultAsync();
            if (question == null)
            {
                return NotFound();
            }

            var vote = await _context.QuestionVotes.Where(x => x.UserId == user.Id && x.QuestionId == model.QuestionId).FirstOrDefaultAsync();
            if (vote != null)
            {
                return BadRequest("Question has already been voted on.");
            }

            var questionVote = new QuestionVote
            {
                QuestionId = model.QuestionId,
                UserId = user.Id,
                Vote = model.Vote
            };

            _context.QuestionVotes.Add(questionVote);

            if (model.Vote == 1)
            {
                question.Upvotes += 1;
            }
            else
            {
                question.Downvotes += 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/votes/question
        [HttpPut("question")]
        [Authorize]
        public async Task<IActionResult> PutQuestionVote(QuestionVoteViewModel model)
        {
            if (model.Vote != 1 && model.Vote != -1)
            {
                return BadRequest();
            }

            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var question = await _context.Questions.Where(x => x.ID == model.QuestionId).FirstOrDefaultAsync();
            if (question == null)
            {
                return NotFound();
            }

            var vote = await _context.QuestionVotes.Where(x => x.UserId == user.Id && x.QuestionId == model.QuestionId).FirstOrDefaultAsync();
            if (vote == null)
            {
                return NotFound("Question has not been voted on yet.");
            }

            if (vote.UserId != user.Id)
            {
                return Unauthorized();
            }

            if (vote.Vote == model.Vote)
            {
                return BadRequest($"The vote already is {vote.Vote}");
            }

            var previousVote = vote.Vote;

            vote.Vote = model.Vote;

            if (previousVote == 1)
            {
                question.Upvotes -= 1;
                question.Downvotes += 1;
            }
            else
            {
                question.Upvotes += 1;
                question.Downvotes -= 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/votes/question/{questionId}
        [HttpDelete("question/{questionId}")]
        [Authorize]
        public async Task<IActionResult> DeleteQuestionVote(int questionId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = await _context.Questions.Where(x => x.ID == questionId).FirstOrDefaultAsync();
            if (answer == null)
            {
                return NotFound();
            }

            var vote = await _context.QuestionVotes.Where(x => x.UserId == user.Id && x.QuestionId == questionId).FirstOrDefaultAsync();
            if (vote == null)
            {
                return NotFound();
            }

            _context.QuestionVotes.Remove(vote);

            if (vote.Vote == 1)
            {
                answer.Upvotes -= 1;
            }
            else
            {
                answer.Downvotes -= 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/votes/answer/{answerId}
        [HttpGet("answer/{answerId}")]
        [Authorize]
        public async Task<ActionResult<AnswerVote>> GetAnswerVote(int answerId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var answerVote = await _context.AnswerVotes.Where(x => x.AnswerId == answerId && x.UserId == user.Id).FirstOrDefaultAsync();
            if (answerVote == null)
            {
                return NotFound();
            }
            return answerVote;
        }

        // POST: api/votes/answer
        [HttpPost("answer")]
        [Authorize]
        public async Task<IActionResult> PostAnswerVote(AnswerVoteViewModel model)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = await _context.Answers.Where(x => x.ID == model.AnswerId).FirstOrDefaultAsync();
            if (answer == null)
            {
                return NotFound();
            }

            var vote = await _context.AnswerVotes.Where(x => x.UserId == user.Id && x.AnswerId == model.AnswerId).FirstOrDefaultAsync();
            if (vote != null)
            {
                return BadRequest("Answer has already been voted on.");
            }

            var answerVote = new AnswerVote
            {
                AnswerId = model.AnswerId,
                UserId = user.Id,
                Vote = model.Vote
            };

            _context.AnswerVotes.Add(answerVote);

            if (model.Vote == 1)
            {
                answer.Upvotes += 1;
            }
            else
            {
                answer.Downvotes += 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/votes/answer
        [HttpPut("answer")]
        [Authorize]
        public async Task<IActionResult> PutAnswerVote(AnswerVoteViewModel model)
        {
            if (model.Vote != 1 && model.Vote != -1)
            {
                return BadRequest();
            }

            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = await _context.Answers.Where(x => x.ID == model.AnswerId).FirstOrDefaultAsync();
            if (answer == null)
            {
                return NotFound();
            }

            var vote = await _context.AnswerVotes.Where(x => x.UserId == user.Id && x.AnswerId == model.AnswerId).FirstOrDefaultAsync();
            if (vote == null)
            {
                return NotFound("Answer has not been voted on yet.");
            }

            if (vote.UserId != user.Id)
            {
                return Unauthorized();
            }

            if (vote.Vote == model.Vote)
            {
                return BadRequest($"The vote already is {vote.Vote}");
            }

            var previousVote = vote.Vote;

            vote.Vote = model.Vote;

            if (previousVote == 1)
            {
                answer.Upvotes -= 1;
                answer.Downvotes += 1;
            }
            else
            {
                answer.Upvotes += 1;
                answer.Downvotes -= 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/votes/answer/{answerId]
        [HttpDelete("answer/{answerId}")]
        [Authorize]
        public async Task<IActionResult> DeleteVote(int answerId)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = await _context.Answers.Where(x => x.ID == answerId).FirstOrDefaultAsync();
            if (answer == null)
            {
                return NotFound();
            }

            var vote = await _context.AnswerVotes.Where(x => x.UserId == user.Id && x.AnswerId == answerId).FirstOrDefaultAsync();
            if (vote == null)
            {
                return NotFound();
            }

            _context.AnswerVotes.Remove(vote);

            if (vote.Vote == 1)
            {
                answer.Upvotes -= 1;
            }
            else
            {
                answer.Downvotes -= 1;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
