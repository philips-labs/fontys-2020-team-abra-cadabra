using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AbracadabraAPI.Authentication;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.ViewModels;
using AbracadabraAPI.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AbracadabraAPI.Data;
using System.Security.Cryptography.X509Certificates;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AbracadabraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AbracadabraContext _context;

        public UsersController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AbracadabraContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _context = context;
        }

        //GET: api/Users/[?pageSize=5&pageIndex=3]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUsers([FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var users = await userManager.Users.Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<UserViewModel> viewModels = new List<UserViewModel>();

            foreach(ApplicationUser user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                viewModels.Add(Mapper.UserToViewModel(user, roles[0]));
            }

            return viewModels;
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserViewModel>> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var roles = await userManager.GetRolesAsync(user);

            return Mapper.UserToViewModel(user, roles[0]);
        }


        //WARNING: PUT MAY NOT BE 'ETHICAL'

        // PUT: api/Questions/5
        //[HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> PutQuestion(string id, ApplicationUser passedUser)
        //{
        //    var user = await userManager.FindByIdAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    user.UserName = passedUser.UserName;
        //    user.Email = passedUser.Email;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException ex)
        //    {
        //        throw ex;
        //    }

        //    return NoContent();
        //}

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserViewModel>> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await userManager.GetRolesAsync(user);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(Mapper.UserToViewModel(user, roles[0]));
        }
    }
}
