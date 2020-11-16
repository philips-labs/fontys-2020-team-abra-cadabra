using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;

namespace AbracadabraAPI.Data
{
    public class MyIdentityDataInitializer
    {
        public static void SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedUsers(UserManager<ApplicationUser> userManager)
        {
            var hasher = new PasswordHasher<ApplicationUser>();
            if (userManager.FindByNameAsync("test0").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "test0";
                user.NormalizedUserName = "TEST0";
                user.Email = "test0@gmail.com";
                user.NormalizedEmail = "test0@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@0").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }


            if (userManager.FindByNameAsync("test1").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "test1";
                user.NormalizedUserName = "TEST1";
                user.Email = "test1@gmail.com";
                user.NormalizedEmail = "test1@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@1").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user,"Admin").Wait();
                }
            }

            if (userManager.FindByNameAsync("test2").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "test2";
                user.NormalizedUserName = "TEST2";
                user.Email = "test2@gmail.com";
                user.NormalizedEmail = "test2@gmail.com".ToUpper();
                user.EmailConfirmed = false;
                user.LastLoggedIn = DateTime.Now;
                user.DateTimeCreated = DateTime.Now;
                user.SecurityStamp = Guid.NewGuid().ToString();

                IdentityResult result = userManager.CreateAsync
                (user, "Password@2").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Expert").Wait();
                }
            }
        }

        public static void SeedRoles (RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "User";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Expert").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Expert";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
