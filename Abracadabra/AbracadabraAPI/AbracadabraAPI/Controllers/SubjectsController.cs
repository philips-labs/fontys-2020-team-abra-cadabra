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


        // GET: api/Subjects/cooking
        [HttpGet("{slug}")]
        public async Task<ActionResult<SubjectWithQuestionsViewModel>> GetSubject(string slug)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName == slug).FirstOrDefaultAsync();
            if (subject == null)
            {
                return NotFound();
            }
            List<Question> questions = await _context.Questions.Where(x => x.Category == slug).ToListAsync();
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
        [Authorize]
        public async Task<IActionResult> PutSubject(int id, SubjectViewModel subjectDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != subjectDTO.ID)
            {
                return BadRequest();
            }

            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            subject.SubjectName = subjectDTO.SubjectName;

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
        [Authorize]
        public async Task<ActionResult<SubjectViewModel>> PostSubject(SubjectViewModel subjectDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var subject = new Subject
            {
                SubjectName = subjectDTO.SubjectName
            };

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubject), new { id = subjectDTO.ID }, Mapper.SubjectToViewModel(subject));
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        [Authorize]
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