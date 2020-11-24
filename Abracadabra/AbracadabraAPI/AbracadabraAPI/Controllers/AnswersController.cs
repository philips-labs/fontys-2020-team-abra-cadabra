using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AbracadabraAPI.Data;
using AbracadabraAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Mappers;
using AbracadabraAPI.ViewModels;
using System.Linq.Expressions;

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AnswersController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnswerViewModel>> GetAnswer(int id)
        {
            var answer = await _context.Answers.Where(x => x.ID == id).FirstOrDefaultAsync();
            var user = await userManager.FindByIdAsync(answer.UserID);

            if (answer == null)
            {
                return NotFound();
            }

            var roles = await userManager.GetRolesAsync(user);

            return Mapper.AnswerToViewModel(answer, user, roles[0]);
        }

        // PUT: api/Answers/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAnswer(int id, AnswerViewModel answerViewModel)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != answerViewModel.ID)
            {
                return BadRequest();
            }

            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            answer.AnswerContent = answerViewModel.AnswerContent;
            answer.QuestionID = answerViewModel.QuestionID;
            answer.UserID = user.Id;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Answers
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AnswerViewModel>> PostAnswer(AnswerViewModel answerViewModel)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = new Answer
            {
                UserID = user.Id,
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm")),
                AnswerContent = answerViewModel.AnswerContent,
                QuestionID = answerViewModel.QuestionID,
                Upvotes = 0,
                Downvotes = 0
            };

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            var roles = await userManager.GetRolesAsync(user);

            return CreatedAtAction(nameof(GetAnswer), new { id = answerViewModel.ID }, Mapper.AnswerToViewModel(answer, user, roles[0]));
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<AnswerViewModel>> DeleteAnswer(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }
            if (answer.UserID != user.Id)
            {
                return Unauthorized();
            }

            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();

            var roles = await userManager.GetRolesAsync(user);

            return Mapper.AnswerToViewModel(answer, user, roles[0]);
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.ID == id);
        }
    }
}
