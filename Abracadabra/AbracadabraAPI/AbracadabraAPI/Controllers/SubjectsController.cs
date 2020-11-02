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
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetSubjects()
        {
            return await _context.Subjects.Select(x => SubjectToDTO(x, _context)).ToListAsync();
        }

        // GET: api/Subjects/
        [HttpGet("{slug}")]
        public async Task<ActionResult<SubjectDTO>> GetSubject(string slug)
        {
            var subject = await _context.Subjects.Where(x => x.SubjectName == slug).FirstOrDefaultAsync();

            if (subject == null)
            {
                return NotFound();
            }

            return SubjectToDTO(subject, _context);
        }

        // PUT: api/Subjects/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutSubject(int id, SubjectDTO subjectDTO)
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
        public async Task<ActionResult<SubjectDTO>> PostSubject(SubjectDTO subjectDTO)
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

            return CreatedAtAction(nameof(GetSubject), new { id = subjectDTO.ID }, SubjectToDTO(subject, _context));
        }

        // DELETE: api/Subjects/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<SubjectDTO>> DeleteSubject(int id)
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

            return SubjectToDTO(subject, _context);
        }

        private bool SubjectExists(int id)
        {
            return _context.Questions.Any(e => e.ID == id);
        }

        private static SubjectDTO SubjectToDTO(Subject subject, AbracadabraContext _context) =>
            new SubjectDTO
            {
                ID = subject.ID,
                SubjectName = subject.SubjectName,
                Questions = _context.Questions.Where(x => x.SubjectID == subject.ID).ToList()
            };
    }
}
