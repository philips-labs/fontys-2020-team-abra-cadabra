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
    public class FlaggedEntitiesController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FlaggedEntitiesController(AbracadabraContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this._userManager = userManager;
        }

        // GET: api/FlaggedQuestions
        [HttpGet("question")]
        public async Task<ActionResult<IList<FlaggedQuestionViewModel>>> GetFlaggedQuestions()
        {
            List<FlaggedQuestionViewModel> models = new List<FlaggedQuestionViewModel>();

            foreach (var flaggedQuestion in _context.FlaggedQuestions)
            {
                bool isMatched = false;

                foreach (var model in models)
                {
                    if (flaggedQuestion.QuestionId == model.QuestionId)
                    {
                        model.Count++;
                        isMatched = true;
                        break;
                    }
                }
                if (!isMatched)
                {
                    var question = await _context.Questions.Where(x => x.ID == flaggedQuestion.QuestionId).FirstOrDefaultAsync();
                    models.Add(new FlaggedQuestionViewModel()
                    {
                        QuestionId = flaggedQuestion.QuestionId,
                        Count = 1,
                        Question = question,
                    });
                }
            }

            return models;
        }

        // GET: api/FlaggedAnswers
        [HttpGet("answer")]
        public async Task<ActionResult<IList<FlaggedAnswerViewModel>>> GetFlaggedAnswers()
        {
            List<FlaggedAnswerViewModel> models = new List<FlaggedAnswerViewModel>();

            foreach (var flaggedAnswer in _context.FlaggedAnswers)
            {
                bool isMatched = false;

                foreach (var model in models)
                {
                    if (flaggedAnswer.AnswerId == model.AnswerId)
                    {
                        model.Count++;
                        isMatched = true;
                        break;
                    }
                }
                if(!isMatched)
                {
                    var answer = await _context.Answers.Where(x => x.ID == flaggedAnswer.AnswerId).FirstOrDefaultAsync();
                    models.Add(new FlaggedAnswerViewModel() {
                        AnswerId = flaggedAnswer.AnswerId,
                        Count = 1,
                        Answer = answer,
                    });
                }
            }

            return models;
        }

        // POST: api/FlaggedQuestions
        [HttpPost("question/{questionId}")]
        [Authorize(Roles = "User,Admin,Expert")]
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

            if(await _context.Questions.Where(q => q.ID == questionId && q.UserID == user.Id.ToString()).CountAsync() > 0)
            {
                return BadRequest("You can't report your own question.");
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
        [Authorize(Roles = "User,Admin,Expert")]
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

            if (await _context.Answers.Where(a => a.ID == answerId && a.UserID == user.Id.ToString()).CountAsync() > 0)
            {
                return BadRequest("You can't report your own answer.");
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
