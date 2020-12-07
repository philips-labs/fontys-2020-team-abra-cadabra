﻿using System;
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

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AbracadabraContext _context;

        public UsersController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, AbracadabraContext context)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            _context = context;
        }

        //GET: api/Users/[?pageSize=5&pageIndex=3]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUsers([FromQuery] int pageSize = 10, [FromQuery] int pageIndex = 0)
        {
            var users = await _userManager.Users.Skip(pageSize * pageIndex).Take(pageSize).ToListAsync();
            List<UserViewModel> viewModels = new List<UserViewModel>();

            foreach (ApplicationUser user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                viewModels.Add(Mapper.UserToViewModel(user, roles[0]));
            }

            return viewModels;
        }

        // GET api/Users/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Mapper.UserToViewModel(user, roles[0]);
        }


        // PUT: api/Users/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserViewModel>> PutUser(string id, UserViewModel userViewModel)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.RemoveFromRolesAsync(user, new List<string>() { "User", "Expert", "Admin" });

            user.UserName = userViewModel.Username;
            user.Email = userViewModel.Email;

            await _userManager.AddToRoleAsync(user, userViewModel.Role);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }

            return NoContent();
        }

        // PUT: api/Users/Edit/5
        [HttpPut("Edit/{id}")]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> EditUserDetails(string id, UserViewModelWithPassword userViewModel)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (await _userManager.CheckPasswordAsync(user, userViewModel.Password) == false)
            {
                return Unauthorized();
            }

            user.UserName = userViewModel.Username;
            user.Email = userViewModel.Email;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }

            return NoContent();
        }

        // PUT: api/Users/Edit/Password/5
        [HttpPut("Edit/Password/{id}")]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> EditUserPassword(string id, UserChangePasswordViewModel userViewModel)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (await _userManager.CheckPasswordAsync(user, userViewModel.CurrentPassword) == false)
            {
                return Unauthorized();
            }

            await _userManager.ChangePasswordAsync(user, userViewModel.CurrentPassword, userViewModel.Password);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw ex;
            }

            return NoContent();
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserViewModel>> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(Mapper.UserToViewModel(user, roles[0]));
        }

        //This should be made as a second call on the profile page if the user has the Expert role.
        // GET api/Users/Profile/Username
        [HttpGet("Profile/{slug}")]
        public async Task<ActionResult<UserWithExpertFieldsViewModel>> GetExpertWithFields(string slug)
        {
            var user = await _userManager.FindByNameAsync(slug);

            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);

            if(roles[0] != "Expert")
            {
                return Mapper.UserWithExpertFieldsToViewModel(user);
            }

            var expertFields = await _context.ExpertSubjects.Where(x => x.UserId == user.Id).ToListAsync();

            List<string> subjectNames = new List<string>();

            foreach (var item in expertFields)
            {
                var subjectName = await _context.Subjects.FindAsync(item.SubjectId);
                subjectNames.Add(subjectName.SubjectName);
            }

            return Mapper.UserWithExpertFieldsToViewModel(user, subjectNames);
        }
    }
}
