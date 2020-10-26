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
    public class QuestionsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public QuestionsController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestions()
        {
            return await _context.Questions.Select(x => QuestionToDTO(x, _context)).ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDTO>> GetQuestion(int id)
        {
            var question = await _context.Questions.Where(x => x.ID == id).FirstOrDefaultAsync();

            if (question == null)
            {
                return NotFound();
            }

            return QuestionToDTO(question, _context);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutQuestion(int id, QuestionDTO questionDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != questionDTO.ID)
            {
                return BadRequest();
            }

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            question.Title = questionDTO.Title;
            question.Description = questionDTO.Description;
            question.UserID = user.Id;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // POST: api/Questions
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult<QuestionDTO>> PostQuestion(QuestionDTO questionDTO)
        {
            //var user = await userManager.FindByNameAsync(User.Identity.Name);
            //if (user == null)
            //{
            //    return Unauthorized();
            //}

            var question = new Question
            {
                UserID = "1",
                Title = questionDTO.Title,
                Description = questionDTO.Description
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestion), new { id = questionDTO.ID }, QuestionToDTO(question, _context));
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<ActionResult<QuestionDTO>> DeleteQuestions(int id)
        {
            //var user = await userManager.FindByNameAsync(User.Identity.Name);
            //if (user == null)
            //{
            //    return Unauthorized();
            //}

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            //if (question.UserID != user.Id)
            //{
            //    return Unauthorized();
            //}

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return QuestionToDTO(question, _context);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }

        private static QuestionDTO QuestionToDTO(Question question, AbracadabraContext _context) =>
            new QuestionDTO
            {
                ID = question.ID,
                Title = question.Title,
                Description = question.Description,
                Category = question.Category,
                DateTimeCreated = question.DateTimeCreated,
                Answers = _context.Answers.Where(x => x.QuestionID == question.ID).ToList()
            };
    }
}
