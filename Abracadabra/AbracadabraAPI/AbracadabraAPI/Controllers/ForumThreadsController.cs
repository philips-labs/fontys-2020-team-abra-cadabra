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
    public class ForumThreadsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public ForumThreadsController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        // GET: api/ForumThreads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ForumThreadDTO>>> GetForumThreads()
        {
            return await _context.ForumThreads.Select(x => ForumThreadToDTO(x, _context)).ToListAsync();
        }

        // GET: api/ForumThreads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ForumThreadDTO>> GetForumThread(int id)
        {
            var forumThread = await _context.ForumThreads.Where(x => x.ID == id).FirstOrDefaultAsync();

            if (forumThread == null)
            {
                return NotFound();
            }

            return ForumThreadToDTO(forumThread, _context);
        }

        // PUT: api/ForumThreads/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutForumThread(int id, ForumThreadDTO forumThreadDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != forumThreadDTO.ID)
            {
                return BadRequest();
            }

            var forumThread = await _context.ForumThreads.FindAsync(id);
            if (forumThread == null)
            {
                return NotFound();
            }

            forumThread.Title = forumThreadDTO.Title;
            forumThread.Description = forumThreadDTO.Description;
            forumThread.UserID = user.Id;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForumThreadExists(id))
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

        // POST: api/ForumThreads
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ForumThreadDTO>> PostForumThread(ForumThreadDTO forumThreadDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var forumThread = new ForumThread
            {
                UserID = user.Id,
                Title = forumThreadDTO.Title,
                Description = forumThreadDTO.Description
            };

            _context.ForumThreads.Add(forumThread);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetForumThread), new { id = forumThreadDTO.ID }, ForumThreadToDTO(forumThread, _context));
        }

        // DELETE: api/ForumThreads/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ForumThreadDTO>> DeleteForumThread(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var forumThread = await _context.ForumThreads.FindAsync(id);
            if (forumThread == null)
            {
                return NotFound();
            }
            if (forumThread.UserID != user.Id)
            {
                return Unauthorized();
            }

            _context.ForumThreads.Remove(forumThread);
            await _context.SaveChangesAsync();

            return ForumThreadToDTO(forumThread, _context);
        }

        private bool ForumThreadExists(int id)
        {
            return _context.ForumThreads.Any(e => e.ID == id);
        }

        private static ForumThreadDTO ForumThreadToDTO(ForumThread forumThread, AbracadabraContext _context) =>
            new ForumThreadDTO
            {
                ID = forumThread.ID,
                Title = forumThread.Title,
                Description = forumThread.Description,
                Category = forumThread.Category,
                DateTimeCreated = forumThread.DateTimeCreated,
                ForumPosts = _context.ForumPosts.Where(x => x.ForumThreadID == forumThread.ID).ToList()
            };
    }
}
