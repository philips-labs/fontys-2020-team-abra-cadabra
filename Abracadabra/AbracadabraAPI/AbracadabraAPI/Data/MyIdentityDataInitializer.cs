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
                user.UserName = "user";
                user.NormalizedUserName = "user";
                user.Email = "user@gmail.com";
                user.NormalizedEmail = "user@gmail.com".ToUpper();
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


            if (userManager.FindByNameAsync("admin").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "admin";
                user.NormalizedUserName = "admin";
                user.Email = "admin@gmail.com";
                user.NormalizedEmail = "admin@gmail.com".ToUpper();
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

            if (userManager.FindByNameAsync("expert").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "expert";
                user.NormalizedUserName = "expert";
                user.Email = "expert@gmail.com";
                user.NormalizedEmail = "expert@gmail.com".ToUpper();
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
