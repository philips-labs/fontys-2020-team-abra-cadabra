using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Data;
using AbracadabraAPI.ViewModels;
using AbracadabraAPI.Mappers;
using AbracadabraAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AbracadabraContext _context;

        public DashboardController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AbracadabraContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _context = context;
        }


        // GET: api/<DashboardController>
        [HttpGet]
        public async Task<IEnumerable<SubjectWithThreeQuestions>> GetTopFiveSubjects()
        {
            List<Question> questions = await _context.Questions.ToListAsync();

            List<Subject> subjectsOrderedByAmountofQuestions = await _context.Subjects
                .OrderByDescending(x => x.Questions.Count)
                .Take(5)
                .ToListAsync();

            List<QuestionTitleViewModel> questioViewModels = new List<QuestionTitleViewModel>();

            foreach (var subject in subjectsOrderedByAmountofQuestions)
            {

                foreach (var question in questions)
                {
                    if (subject.ID == question.SubjectID)
                    {
                        questioViewModels.Add(Mapper.QuestionToQuestionTitleViewModel(subject, question));
                    }
                }
            }

            List<SubjectWithThreeQuestions> subjectViewModels = new List<SubjectWithThreeQuestions>();

            foreach(var subject in subjectsOrderedByAmountofQuestions)
            {
                subjectViewModels.Add(Mapper.SubjectWithThreeQuestionsToViewModel(subject, questioViewModels
                .Where(x => x.SubjectID == subject.ID)
                .OrderByDescending(x => x.TrendingScore)
                .Take(3)
                .Select(x => x.Title)
                .ToList()
                ));
            }

            return subjectViewModels;
        }
  
    }
}
