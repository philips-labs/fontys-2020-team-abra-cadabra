using AbracadabraAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Authentication;
using Microsoft.AspNetCore.Identity;

namespace AbracadabraAPI.Data
{
    public class AbracadabraContext : IdentityDbContext<ApplicationUser>
    {
        public AbracadabraContext(DbContextOptions<AbracadabraContext> options) : base(options)
        {

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Subject> Subjects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var hasher = new PasswordHasher<ApplicationUser>();


            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "test0",
                NormalizedUserName = "TEST0",
                Email = "test0@gmail.com",
                NormalizedEmail = "test0@gmail.com".ToUpper(),
                EmailConfirmed = false,
                PasswordHash = hasher.HashPassword(null, "Password@0"),
                SecurityStamp = Guid.NewGuid().ToString()
            });
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "test1",
                NormalizedUserName = "TEST1",
                Email = "test1@gmail.com",
                NormalizedEmail = "test1@gmail.com".ToUpper(),
                EmailConfirmed = false,
                PasswordHash = hasher.HashPassword(null, "Password@1"),
                SecurityStamp = Guid.NewGuid().ToString()
            });
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "test2",
                NormalizedUserName = "TEST2",
                Email = "test2@gmail.com",
                NormalizedEmail = "test2@gmail.com".ToUpper(),
                EmailConfirmed = false,
                PasswordHash = hasher.HashPassword(null, "Password@2"),
                SecurityStamp = Guid.NewGuid().ToString()
            });

            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<Answer>().ToTable("Answer");
            modelBuilder.Entity<Subject>().ToTable("Subject");
        }
    }
}
