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

            var subject = await _context.Subjects.Where(x => x.SubjectName == applicationViewModel.SubjectName).FirstAsync();
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

            _context.ExpertApplications.Add(application);
            await _context.SaveChangesAsync();

            return StatusCode(200);
        }

        // PUT api/<ApplicationsController>/5
        //[HttpPut("{id}")]

        // DELETE api/<ApplicationsController>/5
        //[HttpDelete("{id}")]

    }
}
