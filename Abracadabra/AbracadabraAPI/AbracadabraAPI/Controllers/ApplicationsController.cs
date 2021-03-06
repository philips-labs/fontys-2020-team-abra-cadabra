﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;
using AbracadabraAPI.Data;
using AbracadabraAPI.Mappers;
using AbracadabraAPI.Models;
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ApplicationsController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        //GET: api/Applications
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ShortApplicationViewModel>>> GetShortApplicationsForSpecificUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            List<ExpertApplication> expertApplications = await _context.ExpertApplications.Where(x => x.UserId == user.Id).ToListAsync();
            if(expertApplications.Count == 0)
            {
                return NoContent();
            }

            List<ShortApplicationViewModel> shortApplicationViewModels = new List<ShortApplicationViewModel>();

            foreach (var application in expertApplications)
            {
                shortApplicationViewModels.Add(Mapper.ApplicationToShortViewModel(application, await _context.Subjects.Where(x => x.ID == application.SubjectId).FirstOrDefaultAsync()));
            }


            return shortApplicationViewModels;
        }

        //GET: api/Applications/all
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ApplicationViewModel>>> GetApplications()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            List<ExpertApplication> expertApplications = await _context.ExpertApplications.ToListAsync();
            if (expertApplications.Count == 0)
            {
                return NoContent();
            }

            List<ApplicationViewModel> applicationViewModels = new List<ApplicationViewModel>();

            foreach (var application in expertApplications)
            {
                if (application.Status == ApplicationStatus.Pending) {
                    applicationViewModels.Add(Mapper.ApplicationToViewModel(application, await _context.Subjects.Where(x => x.ID == application.SubjectId).FirstOrDefaultAsync(), await  _userManager.FindByIdAsync(application.UserId)));
                };
            }


            return applicationViewModels;
        }

        //GET: api/Applications/dashboard
        [HttpGet("dashboard")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ApplicationViewModel>>> GetApplicationsForDashboard()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            List<ExpertApplication> expertApplications = await _context.ExpertApplications.OrderBy(x => x.DateTimeCreated).ToListAsync();
            if (expertApplications.Count == 0)
            {
                return NoContent();
            }

            List<ApplicationViewModel> applicationViewModels = new List<ApplicationViewModel>();

            foreach (var application in expertApplications)
            {
                if (application.Status == ApplicationStatus.Pending)
                {
                    applicationViewModels.Add(Mapper.ApplicationToViewModel(application, await _context.Subjects.Where(x => x.ID == application.SubjectId).FirstOrDefaultAsync(), await _userManager.FindByIdAsync(application.UserId)));
                };
            }


            return applicationViewModels.Take(5).ToList();
        }

        // POST: api/Applications
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApplicationViewModel>> PostApplication(ApplicationViewModel applicationViewModel)
        {

            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return NotFound();
            }

            var subject = await _context.Subjects.Where(x => x.SubjectName == applicationViewModel.SubjectName).FirstOrDefaultAsync();
            if(subject == null)
            {
                return NotFound("Subject not found");
            }

            var application = new ExpertApplication
            {
                Motivation = applicationViewModel.Motivation,
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm")),
                SubjectId = subject.ID,
                UserId = user.Id,
            };

            //Checks if the user has an pending application for the subject he is applying in

            List<ExpertApplication> expertApplications = await _context.ExpertApplications.Where(x => x.UserId == user.Id).ToListAsync();

            if (expertApplications.Count != 0)
            {
                foreach (var userApplication in expertApplications)
                {
                    if (userApplication.SubjectId == application.SubjectId && userApplication.Status == ApplicationStatus.Pending)
                    {
                        return StatusCode(400, "You already have an active request for this subject!");
                    }
                    if (userApplication.SubjectId == application.SubjectId && userApplication.ReviewedBy != null)
                    {
                        int value = DateTime.Compare(userApplication.ReviewedOn.AddMinutes(2), DateTime.Now);
                        bool TimePassed =  value != 1;
                        if(TimePassed == false)
                        {
                            return StatusCode(400, "Your last request was to recent. you can apply 2 minutes after your last request has been denied.");
                        }

                        if (TimePassed && userApplication.SubjectId == application.SubjectId && userApplication.Status == ApplicationStatus.Denied)
                        {
                            userApplication.Status = ApplicationStatus.Pending;
                            userApplication.ReviewedBy = null;
                            await _context.SaveChangesAsync();

                            return StatusCode(200, "Your application for " + applicationViewModel.SubjectName + " has been set to Pending");
                        }
                         return StatusCode(400, "You have applied for this subject already or have been approved!");
                    }
                }
            }

            _context.ExpertApplications.Add(application);
            await _context.SaveChangesAsync();

            return StatusCode(200, "Your application for " + applicationViewModel.SubjectName + " has been submitted");
        }

        // PUT api/<ApplicationsController>/5
        [HttpPut("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put(string userId, ApplicationViewModel applicationViewModel)
        {
            //1 approve 2//deny

            var admin = await _userManager.FindByNameAsync(User.Identity.Name);

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var associatedsubject = await _context.Subjects.Where(x => x.SubjectName == applicationViewModel.SubjectName).FirstOrDefaultAsync();

            var application = await _context.ExpertApplications.Where(x => x.SubjectId == associatedsubject.ID && user.Id == x.UserId).FirstOrDefaultAsync();
            
            if(application == null)
            {
                return StatusCode(404, "No such application exists!");
            }

            var expertSubject = new ExpertSubject
            {
                UserId = user.Id,
                SubjectId = associatedsubject.ID
            };

            switch (applicationViewModel.Status)
            {
                case ApplicationStatus.Approved:
                    application.Status = ApplicationStatus.Approved;
                    _context.ExpertSubjects.Add(expertSubject);
                    break;
                case ApplicationStatus.Denied:
                    application.Status = ApplicationStatus.Denied;
                    break;
                default: application.Status = ApplicationStatus.Pending; break;
            }
            application.ReviewedBy = admin.Id;
            application.ReviewedOn = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm"));

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500);
            }

            return NoContent();
        }

        // DELETE api/<ApplicationsController>/5
        //[HttpDelete("{id}")]

    }
}
