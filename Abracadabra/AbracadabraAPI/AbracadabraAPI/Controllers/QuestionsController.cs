using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AbracadabraAPI.Data;
using AbracadabraAPI.Models;
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Mappers;
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
        public async Task<ActionResult<IList<QuestionViewModel>>> GetQuestions()
        {
            List<ApplicationUser> users = await userManager.Users.ToListAsync();

            List<Question> questions = await _context.Questions.ToListAsync();

            List<QuestionViewModel> models = new List<QuestionViewModel>();


            foreach (Question question in questions)
            {
                List<AnswerViewModel> answerViewModels = new List<AnswerViewModel>();

                foreach (Answer answer in _context.Answers) {

                    var answerUser = await userManager.FindByIdAsync(answer.UserID);
                    if (answer.QuestionID == question.ID)
                    {
                        answerViewModels.Add(Mapper.AnswerToViewModel(answer, answerUser));
                    }
                }
                models.Add(Mapper.QuestionToViewModel(question, users.Find(user => user.Id == question.UserID), answerViewModels));
            }

            return models;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionViewModel>> GetQuestion(int id)
        {
            var question = await _context.Questions.Where(x => x.ID == id).FirstOrDefaultAsync();

            var user = await userManager.FindByIdAsync(question.UserID);

            List<AnswerViewModel> answerViewModels = new List<AnswerViewModel>();

            if (question == null)
            {
                return NotFound();
            }

            foreach(Answer answer in _context.Answers)
            {
                var answerUser = await userManager.FindByIdAsync(answer.UserID);
                if (answer.QuestionID == question.ID)
                {
                    answerViewModels.Add(Mapper.AnswerToViewModel(answer, answerUser));
                }
            }

            return Mapper.QuestionToViewModel(question, user, answerViewModels);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutQuestion(int id, QuestionViewModel questionViewModel)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != questionViewModel.ID)
            {
                return BadRequest();
            }

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            question.Title = questionViewModel.Title;
            question.Description = questionViewModel.Description;
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
        [Authorize]
        public async Task<ActionResult<QuestionViewModel>> PostQuestion(QuestionViewModel questionViewModel)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var question = new Question
            {
                UserID = user.Id,
                Title = questionViewModel.Title,
                Description = questionViewModel.Description,
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm"))
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestion), new { id = questionViewModel.ID }, Mapper.QuestionToViewModel(question, user, null));
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<ActionResult<QuestionViewModel>> DeleteQuestions(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            if (question.UserID != user.Id)
            {
                return Unauthorized();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Mapper.QuestionToViewModel(question, user, null);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }
    }
}
