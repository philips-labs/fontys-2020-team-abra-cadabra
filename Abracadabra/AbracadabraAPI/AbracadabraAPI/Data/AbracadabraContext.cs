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
        public DbSet<QuestionVote> QuestionVotes { get; set; }
        public DbSet<AnswerVote> AnswerVotes { get; set; }
        public DbSet<FlaggedQuestion> FlaggedQuestions { get; set; }
        public DbSet<FlaggedAnswer> FlaggedAnswers { get; set; }
        public DbSet<ExpertApplication> ExpertApplications { get; set; }
        public DbSet<ExpertSubject> ExpertSubjects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<Answer>().ToTable("Answer");
            modelBuilder.Entity<Subject>().ToTable("Subject");
            modelBuilder.Entity<QuestionVote>().ToTable("QuestionVote");
            modelBuilder.Entity<AnswerVote>().ToTable("AnswerVote");
            modelBuilder.Entity<FlaggedQuestion>().ToTable("FlaggedQuestion");
            modelBuilder.Entity<FlaggedAnswer>().ToTable("FlaggedAnswer");
            modelBuilder.Entity<ExpertApplication>().ToTable("ExpertApplications");
            modelBuilder.Entity<ExpertSubject>().HasKey(es => new { es.UserId, es.SubjectId });
        }
    }
}
