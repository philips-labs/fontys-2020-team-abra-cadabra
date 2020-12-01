using System;
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

        //GET: api/Applications/{userId}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ShortApplicationViewModel>>> GetShortApplicationsForSpecificUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

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

        // POST: api/Applications
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApplicationViewModel>> PostApplication(ApplicationViewModel applicationViewModel)
        {

            var user = await _userManager.FindByIdAsync(applicationViewModel.UserId);
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
                DateTimeCreated = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm")),
                SubjectId = subject.ID,
                UserId = user.Id,
            };

            //Checks if the user has an pending application for the subject he is applying in

            List<ExpertApplication> expertApplications = await _context.ExpertApplications.Where(x => x.UserId == user.Id).ToListAsync();

            if (expertApplications.Count != 0)
            {
                foreach (var userApplication in expertApplications)
                {
                    if (userApplication.SubjectId == application.SubjectId && userApplication.Status == 0)
                    {
                        return StatusCode(400, "You already has an active request for this subject!");
                    }
                }
            }

            _context.ExpertApplications.Add(application);
            await _context.SaveChangesAsync();

            return StatusCode(200, "Application for " + applicationViewModel.SubjectName + " has been submitted");
        }

        // PUT api/<ApplicationsController>/5
        [HttpPut("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutQuestion(string userId, ApplicationViewModel applicationViewModel)
        {
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

            switch (applicationViewModel.Status)
            {
                case ApplicationStatus.Approved: application.Status = ApplicationStatus.Approved; break;
                case ApplicationStatus.Denied: application.Status = ApplicationStatus.Denied; break;
            }
            application.ReviewedBy = admin.Id;
            application.ReviewedOn = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd hh:mm"));

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
