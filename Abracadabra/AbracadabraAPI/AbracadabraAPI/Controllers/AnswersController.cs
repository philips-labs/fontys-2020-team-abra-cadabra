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
        public async Task<ActionResult<AnswerDTO>> GetAnswer(int id)
        {
            var answer = await _context.Answers.Where(x => x.ID == id).FirstOrDefaultAsync();

            if (answer == null)
            {
                return NotFound();
            }

            return AnswerToDTO(answer);
        }

        // PUT: api/Answers/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAnswer(int id, AnswerDTO answerDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != answerDTO.ID)
            {
                return BadRequest();
            }

            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            answer.AnswerContent = answerDTO.AnswerContent;
            answer.DateTimeCreated = answerDTO.DateTimeCreated;
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
        public async Task<ActionResult<AnswerDTO>> PostAnswer(AnswerDTO answerDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var answer = new Answer
            {
                UserID = user.Id,
                DateTimeCreated = DateTime.Now,
                AnswerContent = answerDTO.AnswerContent
            };

            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnswer), new { id = answerDTO.ID }, AnswerToDTO(answer));
        }

        // DELETE: api/ForumPosts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<AnswerDTO>> DeleteAnswer(int id)
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

            return AnswerToDTO(answer);
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.ID == id);
        }

        private static AnswerDTO AnswerToDTO(Answer answer) =>
            new AnswerDTO
            {
                ID = answer.ID,
                AnswerContent = answer.AnswerContent,
                DateTimeCreated = answer.DateTimeCreated
            };
    }
}
