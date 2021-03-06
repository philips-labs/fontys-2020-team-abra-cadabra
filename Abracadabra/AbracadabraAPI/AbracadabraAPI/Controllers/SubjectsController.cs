﻿using System;
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
using AbracadabraAPI.ViewModels;
using AbracadabraAPI.Mappers;

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public SubjectsController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/Subjects
        [HttpGet("landingsubjects")]
        public async Task<ActionResult<IEnumerable<SubjectWithSizeViewModel>>> GetTop8Subjects()
        {
            try
            {
                //order by the amount of questions. this is also the size.
                List<Subject> subjects = await _context.Subjects.OrderBy(s => s.Questions.Count()).Take(8).ToListAsync();
                List<SubjectWithSizeViewModel> models = new List<SubjectWithSizeViewModel>();

                foreach (Subject subject in subjects)
                {
                    int questionCount = await _context.Questions.Where(q => q.SubjectID == subject.ID).CountAsync();

                    if (questionCount >= 30)
                    {
                        models.Add(Mapper.SubjectWithSizeToViewModel(subject, "VeryBigSubject"));
                    }
                    else if (questionCount >= 10)
                    {
                        models.Add(Mapper.SubjectWithSizeToViewModel(subject, "BigSubject"));
                    }
                    else if (questionCount >= 5)
                    {
                        models.Add(Mapper.SubjectWithSizeToViewModel(subject, "MediumSubject"));
                    }
                    else
                    {
                        models.Add(Mapper.SubjectWithSizeToViewModel(subject, "Normal"));
                    }  
                }

                return models;
            }
            catch
            {
                return new ObjectResult("Something went wrong trying to retrieve the top 8 subjects and their size.") { StatusCode = 500 };
            }
        }

        // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectViewModel>>> GetSubjects()
        {
            List<Subject> subjects = await _context.Subjects.ToListAsync();
            List<SubjectViewModel> models = new List<SubjectViewModel>();
            foreach (Subject subject in subjects)
            {
                models.Add(Mapper.SubjectToViewModel(subject));
            }
            return models;
        }

        // GET: api/Subjects/cooking/searchBar/test
        [HttpGet("{slug}/searchBar")]
        public async Task<ActionResult<SubjectWithQuestionsViewModel>> GetSubjectBySearch([FromQuery] SearchViewModel searchViewModel)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName == searchViewModel.subject).FirstOrDefaultAsync();
            var questions = await _context.Questions.Where(x => x.SubjectID == subject.ID && x.Title.Contains(searchViewModel.search)).ToListAsync();

            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var item in questions)
            {
                var auser = await userManager.Users.Where(x => x.Id == item.UserID).FirstAsync();
                users.Add(auser);
            }

            List<QuestionWithAnswerCount> questionViewModels = new List<QuestionWithAnswerCount>();


            foreach (Question question in questions)
            {
                int nr = _context.Answers.Where(x => x.QuestionID == question.ID).Count();
                questionViewModels.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), nr));
            }

            var model = Mapper.SubjectWithQuestionsToViewModel(subject, questionViewModels);
            return model;
        }

        // GET: api/Subjects/cooking
        [HttpGet("{slug}")]
        public async Task<ActionResult<SubjectWithQuestionsViewModel>> GetSubject(string slug)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName.ToLower() == slug.ToLower()).FirstOrDefaultAsync();
            if (subject == null)
            {
                return NotFound();
            }

            //List<Question> questions = await _context.Questions.Where(x => x.Category == slug).ToListAsync();

            List<Question> questions = await _context.Questions.Where(x => x.SubjectID == subject.ID).ToListAsync();

            List<ApplicationUser> users = new List<ApplicationUser>();
            foreach (var item in questions)
            {
                var auser = await userManager.Users.Where(x => x.Id == item.UserID).FirstAsync();
                users.Add(auser);
            }

            List<QuestionWithAnswerCount> questionViewModels = new List<QuestionWithAnswerCount>();


            foreach (Question question in questions)
            {
                int nr = _context.Answers.Where(x => x.QuestionID == question.ID).Count();
                questionViewModels.Add(Mapper.QuestionWithAnswerCountToViewModel(question, users.Find(user => user.Id == question.UserID), nr));
            }

            var model = Mapper.SubjectWithQuestionsToViewModel(subject, questionViewModels);
            return model;
        }

        // PUT: api/Subjects/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutSubject(int id, SubjectViewModel subjectViewModel)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != subjectViewModel.ID)
            {
                return BadRequest();
            }
            if (await _context.Subjects.Where(s => s.SubjectName.ToLower() == subjectViewModel.SubjectName.ToLower() && s.ID != id).CountAsync() > 0)
            {
                return BadRequest("Subject name is already in use.");
            }

            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            subject.SubjectName = subjectViewModel.SubjectName;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
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

        // POST: api/Subjects
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SubjectViewModel>> PostSubject(SubjectViewModel subjectViewModel)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if(await _context.Subjects.Where(s => s.SubjectName.ToLower() == subjectViewModel.SubjectName.ToLower()).CountAsync() > 0)
            {
                return BadRequest("Subject name is already in use.");
            }

            var subject = new Subject
            {
                SubjectName = subjectViewModel.SubjectName
            };

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return Mapper.SubjectToViewModel(subject);
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<SubjectViewModel>> DeleteSubject(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return Mapper.SubjectToViewModel(subject);
        }

        private bool SubjectExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }


    }
}