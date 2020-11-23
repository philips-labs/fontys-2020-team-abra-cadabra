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
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestions([FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {


            List<Question> questions = await _context.Questions.Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var item in questions)
            {
                var auser = await userManager.Users.Where(x => x.Id == item.UserID).FirstAsync();

                users.Add(auser);
            }
            
            List<QuestionWithAnswerCount> models = new List<QuestionWithAnswerCount>();


            foreach (Question question in questions)
            {
                int nr = _context.Answers.Where(x => x.QuestionID == question.ID).Count();
                models.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), nr));
            }

            return models;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionViewModel>> GetQuestion(int id)
        {
            var question = await _context.Questions.Where(x => x.ID == id).FirstOrDefaultAsync();

            var user = await userManager.FindByIdAsync(question.UserID);
            List<Answer> answers = await _context.Answers.Where(x => x.QuestionID == question.ID).ToListAsync();

            List<AnswerViewModel> answerViewModels = new List<AnswerViewModel>();

            if (question == null)
            {
                return NotFound();
            }

            foreach (Answer answer in answers)
            {
                var answerUser = await userManager.FindByIdAsync(answer.UserID);
                if (answer.QuestionID == question.ID)
                {
                    answerViewModels.Add(Mapper.AnswerToViewModel(answer, answerUser));
                }
            }

            return Mapper.QuestionToViewModel(question, user, answerViewModels, null);
        }

        // GET: api/Questions/[subject]/trending[?pageSize=5&pageIndex=0]
        [HttpGet("{subject}/trending")]
        public async Task<ActionResult<IList<Question>>> GetQuestionsSortedByTrending(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName == subjectName).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }

            // TODO: Category and subject? Why not a subject table with a foreign key relationship to question?
            List<Question> questions = await _context.Questions.Where(x => x.Category == subjectName)
                .Skip(pageSize * pageIndex)
                .Take(pageSize)
                .OrderByDescending(x => x.TrendingScore)
                .ToListAsync();

            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var question in questions)
            {
                var user = await userManager.Users.Where(x => x.Id == question.UserID).FirstOrDefaultAsync();
                users.Add(user);
            }

            return questions;
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
            var subject = await _context.Subjects.Where(s => s.SubjectName == questionViewModel.SubjectSlug).FirstOrDefaultAsync();

            var question = new Question
            {
                UserID = user.Id,
                Title = questionViewModel.Title,
                Description = questionViewModel.Description,
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm")),
                SubjectID = subject.ID,
                Category = subject.SubjectName,
                Upvotes = 0,
                Downvotes = 0
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestion), new { id = questionViewModel.ID }, Mapper.QuestionToViewModel(question, user, null, subject));
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        [Authorize]
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

            return Mapper.QuestionToViewModel(question, user, null, null);
        }

        // GET: api/Questions/Cooking/new[?pagesize=5]
        [HttpGet("{subject}/new")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByDate(string subject, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var subjects = await _context.Subjects.Where(x => x.SubjectName == subject).ToListAsync();
            if (subjects == null)
            {
                return BadRequest();
            }
            List<Question> questions = await _context.Questions.Where(x => x.Category == subject).Skip(pageSize * pageIndex).Take(pageSize).OrderByDescending(x => x.DateTimeCreated).ToListAsync();
            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var item in questions)
            {
                var auser = await userManager.Users.Where(x => x.Id == item.UserID).FirstAsync();
                users.Add(auser);
            }

            List<QuestionWithAnswerCount> models = new List<QuestionWithAnswerCount>();


            foreach (Question question in questions)
            {
                int nr = _context.Answers.Where(x => x.QuestionID == question.ID).Count();
                models.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), nr));
            }

            return models;
        }

        // GET: api/Questions/Cooking/unanswered[?pagesize=5]
        [HttpGet("{subject}/unanswered")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByUnanswered(string subject, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var subjects = await _context.Subjects.Where(x => x.SubjectName == subject).ToListAsync();
            if (subjects == null)
            {
                return BadRequest();
            }
            List<Question> questions = await _context.Questions.Where(x => x.Category == subject).Where(x => x.Answers.Count() == 0).Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var item in questions)
            {
                var auser = await userManager.Users.Where(x => x.Id == item.UserID).FirstAsync();
                users.Add(auser);
            }

            List<QuestionWithAnswerCount> models = new List<QuestionWithAnswerCount>();


            foreach (Question question in questions)
            {
                models.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), 0));
            }

            return models;
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }
    }
}
