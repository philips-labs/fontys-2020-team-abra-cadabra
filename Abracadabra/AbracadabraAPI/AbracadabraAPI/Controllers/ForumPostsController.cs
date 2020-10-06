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
    public class ForumPostsController : ControllerBase
    {
        private readonly AbracadabraContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public ForumPostsController(AbracadabraContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        private async Task<ActionResult<ForumPostDTO>> GetForumPost(int id)
        {
            var forumPost = await _context.ForumPosts.Where(x => x.ID == id).FirstOrDefaultAsync();

            if (forumPost == null)
            {
                return NotFound();
            }

            return ForumPostToDTO(forumPost);
        }

        // PUT: api/ForumPosts/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutForumPost(int id, ForumPostDTO forumPostDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            if (id != forumPostDTO.ID)
            {
                return BadRequest();
            }

            var forumPost = await _context.ForumPosts.FindAsync(id);
            if (forumPost == null)
            {
                return NotFound();
            }

            forumPost.PostContent = forumPostDTO.PostContent;
            forumPost.DateTimeCreated = forumPostDTO.DateTimeCreated;
            forumPost.UserID = user.Id;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForumPostExists(id))
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

        // POST: api/ForumPosts
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ForumPostDTO>> PostForumPost(ForumPostDTO forumPostDTO)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var forumPost = new ForumPost
            {
                UserID = user.Id,
                DateTimeCreated = forumPostDTO.DateTimeCreated,
                PostContent = forumPostDTO.PostContent
            };

            _context.ForumPosts.Add(forumPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetForumPost), new { id = forumPostDTO.ID }, ForumPostToDTO(forumPost));
        }

        // DELETE: api/ForumPosts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ForumPostDTO>> DeleteForumPost(int id)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var forumPost = await _context.ForumPosts.FindAsync(id);
            if (forumPost == null)
            {
                return NotFound();
            }
            if (forumPost.UserID != user.Id)
            {
                return Unauthorized();
            }

            _context.ForumPosts.Remove(forumPost);
            await _context.SaveChangesAsync();

            return ForumPostToDTO(forumPost);
        }

        private bool ForumPostExists(int id)
        {
            return _context.ForumPosts.Any(e => e.ID == id);
        }

        private static ForumPostDTO ForumPostToDTO(ForumPost forumPost) =>
            new ForumPostDTO
            {
                ID = forumPost.ID,
                PostContent = forumPost.PostContent,
                DateTimeCreated = forumPost.DateTimeCreated
            };
    }
}
