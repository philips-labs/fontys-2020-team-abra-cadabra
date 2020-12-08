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
    public class EndorsedAnswersController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public EndorsedAnswersController(AbracadabraContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            this._userManager = userManager;
        }

        // GET: api/EndorsedAnswers
        [HttpGet("{answerId}")]
        public async Task<ActionResult<EndorsedAnswerViewModel>> GetEndorsedAnswer(int answerId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            EndorsedAnswer endorsedAnswer = await _context.EndorsedAnswers.Where(x => x.AnswerId == answerId && x.UserId == user.Id).FirstOrDefaultAsync();
            if (endorsedAnswer == null)
            {
                return NotFound();
            }

            return new EndorsedAnswerViewModel
            {
                Id = endorsedAnswer.Id,
                AnswerId = endorsedAnswer.AnswerId,
                UserId = endorsedAnswer.UserId,
            };
        }

        //GET: api/EndorsedAnswers/all
        [HttpGet("{answerId}/all")]
        public async Task<ActionResult<IEnumerable<EndorsedAnswerViewModel>>> GetAllEndorsedAnswers(int answerId)
        {
            List<EndorsedAnswer> endorsedAnswers = await _context.EndorsedAnswers.Where(x => x.AnswerId == answerId).ToListAsync();
            if (endorsedAnswers.Count == 0)
            {
                return NoContent();
            }

            List<EndorsedAnswerViewModel> endorsedAnswerViewModels = new List<EndorsedAnswerViewModel>();

            foreach (var endorsment in endorsedAnswers)
            {
                endorsedAnswerViewModels.Add(new EndorsedAnswerViewModel
                {
                    Id = endorsment.Id,
                    AnswerId = endorsment.AnswerId,
                    UserId = endorsment.UserId,
                }
                );
            }

            return endorsedAnswerViewModels;
        }

        // POST: api/EndorsedAnswers
        [HttpPost("{answerId}")]
        [Authorize(Roles = "Expert")]
        public async Task<ActionResult> EndorseAnswer(int answerId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            var endorsement = await _context.EndorsedAnswers.Where(x => x.UserId == user.Id && x.AnswerId == answerId).FirstOrDefaultAsync();
            if (endorsement != null)
            {
                return BadRequest("Answer has already been endorsed by the user.");
            }

            var endorsedAnswer = new EndorsedAnswer
            {
                UserId = user.Id.ToString(),
                AnswerId = answerId,
            };

            _context.EndorsedAnswers.Add(endorsedAnswer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/EndorsedAnswers
        [HttpDelete("{answerId}")]
        [Authorize(Roles = "Expert")]
        public async Task<ActionResult> RemoveAnswerEndorsement(int answerId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            EndorsedAnswer endorsedAnswer = await _context.EndorsedAnswers.Where(x => x.AnswerId == answerId && x.UserId == user.Id).FirstOrDefaultAsync();
            if (endorsedAnswer == null)
            {
                return NotFound();
            }
            
            _context.EndorsedAnswers.Remove(endorsedAnswer);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
