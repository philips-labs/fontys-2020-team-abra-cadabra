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
            if (question == null)
            {
                return NotFound();
            }

            var user = await userManager.FindByIdAsync(question.UserID);
            List<Answer> answers = await _context.Answers.Where(x => x.QuestionID == question.ID).ToListAsync();
            int endorsements;
            List<AnswerViewModel> answerViewModels = new List<AnswerViewModel>();
            
            foreach (Answer answer in answers)
            {
                var answerUser = await userManager.FindByIdAsync(answer.UserID);
                var rolesAnswer = await userManager.GetRolesAsync(answerUser);
                endorsements = _context.EndorsedAnswers.Where(x => x.AnswerId == answer.ID).Count();
                answerViewModels.Add(Mapper.AnswerToViewModel(answer, answerUser, endorsements, rolesAnswer[0]));
            }

            var roles = await userManager.GetRolesAsync(user);
            answerViewModels = answerViewModels.OrderByDescending(x => x.Endorsements).ToList();            
            roles[0] = await ExpertCheck(question.SubjectID, user.Id);

            return Mapper.QuestionToViewModel(question, user, answerViewModels, null, roles[0]);
        }

        // GET: api/Questions/[subject]/trending[?pageSize=5&pageIndex=0]
        [HttpGet("{subjectName}/trending")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByTrending(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == subjectName.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }

            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID)
                .Skip(pageSize * pageIndex)
                .Take(pageSize)
                .OrderBy(x => x.TrendingScore)
                .ToListAsync();

            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var question in questions)
            {
                var user = await userManager.Users.Where(x => x.Id == question.UserID).FirstOrDefaultAsync();
                users.Add(user);
            }

            List<QuestionWithAnswerCount> models = new List<QuestionWithAnswerCount>();
            foreach (var question in questions)
            {
                int nr = _context.Answers.Where(x => x.QuestionID == question.ID).Count();
                models.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), nr));
            }

            return models;
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        [Authorize(Roles = "User,Admin,Expert")]
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
        [Authorize(Roles = "User,Admin,Expert")]
        public async Task<ActionResult<QuestionViewModel>> PostQuestion(QuestionViewModel questionViewModel)
        {

              var  user = await userManager.FindByNameAsync(User.Identity.Name);
                if(user == null)
                {
                return Unauthorized();
                }

            var subject = await _context.Subjects.Where(s => s.SubjectName.ToLower() == questionViewModel.SubjectName.ToLower()).FirstOrDefaultAsync();

            var questionToPost = new Question
            {
                UserID = user.Id.ToString(),
                Title = questionViewModel.Title,
                Description = questionViewModel.Description,
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm")),
                SubjectID = subject.ID,
                Upvotes = 0,
                Downvotes = 0
            };

            _context.Questions.Add(questionToPost);
            await _context.SaveChangesAsync();

            var roles = await userManager.GetRolesAsync(user);

            roles[0] = await ExpertCheck(subject.ID, user.Id);

            return CreatedAtAction(nameof(GetQuestion), new { id = questionViewModel.ID }, Mapper.QuestionToViewModel(questionToPost, user, null, subject, roles[0]));
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin,Expert")]
        public async Task<ActionResult<QuestionViewModel>> DeleteQuestions(int id)
        {
 
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }
            var roles = await userManager.GetRolesAsync(user);

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            if (question.UserID != user.Id && roles[0] != "Admin")
            {
                return Unauthorized();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

           

            roles[0] = await ExpertCheck(question.SubjectID, user.Id);

            return Mapper.QuestionToViewModel(question, user, null, null, roles[0]);
        }

        // GET: api/Questions/Cooking/new[?pagesize=5]
        [HttpGet("{subjectName}/new")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByDate(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == subjectName.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }
            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID).Skip(pageSize * pageIndex).Take(pageSize).OrderByDescending(x => x.DateTimeCreated).ToListAsync();

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
        [HttpGet("{subjectName}/unanswered")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByUnasnwered(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)

        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == subjectName.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }

            //List<Question> questions = await _context.Questions.Where(x => x.Category == subject).Where(x => x.Answers.Count() == 0).Skip(pageSize * pageIndex).Take(pageSize).OrderByDescending(x => x.DateTimeCreated).ToListAsync();

            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID).Where(x => x.Answers.Count() == 0).Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();

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

        // GET: api/Questions/Cooking/answered[?pagesize=5]
        [HttpGet("{subjectName}/answered")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> GetQuestionsSortedByAnswered(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)

        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == subjectName.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }

            //List<Question> questions = await _context.Questions.Where(x => x.Category == subject).Where(x => x.Answers.Count() == 0).Skip(pageSize * pageIndex).Take(pageSize).OrderByDescending(x => x.DateTimeCreated).ToListAsync();

            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID).Where(x => x.Answers.Count() > 0).Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();

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

        // GET: api/Questions/Cooking/expert[?pagesize=5]
        [HttpGet("{subjectName}/expert")]
        public async Task<ActionResult<IList<QuestionWithAnswerCount>>> SortingQuestionByExpert(string subjectName, [FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)

        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == subjectName.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return BadRequest();
            }
            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID && x.IsAnsweredByExpert == true).Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
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

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }

        private async Task<string> ExpertCheck(int subjectId, string userId)
        {
            var expertSubject = await _context.ExpertSubjects.Where(x => x.SubjectId == subjectId && x.UserId == userId).FirstOrDefaultAsync();
            if (expertSubject == null)
            {
                 return "User";
            }
            else
            {
                return "Expert";
            }
        }
    }
}
