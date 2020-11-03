using System;
using System.Collections.Generic;
using AbracadabraAPI.Data;
using AbracadabraAPI.Models;
using System.Text;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.Authentication;

namespace AbraCadabraAPITests
{
    public static class Utilities
    {
        public static void InitializeDbForTests(AbracadabraContext db)
        {
            db.Answers.AddRange(GetSeedingMessages());
            db.Users.AddRange(GetUsers());
            db.Subjects.AddRange(GetSubjects());
            db.Questions.AddRange(GetQuestions());

            db.SaveChanges();
        }

        public static void ReinitializeDbForTests(AbracadabraContext db)
        {
            db.Answers.RemoveRange(db.Answers);
            InitializeDbForTests(db);
        }
        public static List<Answer> GetSeedingMessages()
        {
            return new List<Answer>()
            {
             new Answer(){ID = 1, UserID = "1", AnswerContent="Testinngngngngngn", QuestionID = 1},
             new Answer(){ID = 2, UserID = "2", AnswerContent="Creatededededed", QuestionID = 1},
             new Answer(){ID = 3, UserID = "1", AnswerContent="Heyeeyeyeyeyeyeyey", QuestionID = 2}
            };
        }
        public static List<ApplicationUser> GetUsers()
        {
            return new List<ApplicationUser>()
            {
             new ApplicationUser(){Id = "1", UserName = "Ricardo", Email="Ricardo@gmail.com", PasswordHash="123123"},
             new ApplicationUser(){Id = "2", UserName = "Miloso", Email="Miloso@gmail.com", PasswordHash="123123"},
             new ApplicationUser(){Id = "3", UserName = "Henry", Email="Henry@gmail.com", PasswordHash="123123"},
            };
        }
        public static List<Subject> GetSubjects()
        {
            return new List<Subject>()
            {
                new Subject() { SubjectName = "Cooking" },
                new Subject() { SubjectName = "Gaming" },

            };
        }
        public static List<Question> GetQuestions()
        {
            return new List<Question>()
            {
                new Question() { ID= 1 , UserID ="1",SubjectID = 1, Title="How to cook cat?", Category="Cooking", Description="Hello how to cook cat", DateTimeCreated= DateTime.Parse("2020-9-19-11:35") }
            };
        }
    }
}
