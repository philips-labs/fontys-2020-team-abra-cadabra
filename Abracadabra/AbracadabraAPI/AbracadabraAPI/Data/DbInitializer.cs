﻿using AbracadabraAPI.Authentication;
using AbracadabraAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration.UserSecrets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AbracadabraContext context)
        {
            context.Database.EnsureCreated();

            if (context.Questions.Any())
            {
                return;
            }
            List<string> userIds = new List<string>();

            for (int i = 0; i < context.Users.Count(); i++)
            {
                userIds.Add(context.Users.Where(x => x.UserName == $"test{i}").FirstOrDefault().Id);
            }
            var subects = new Subject[]
            {
                new Subject
                {
                    
                    SubjectName = "Cooking",

                },
                new Subject
                {
                    
                    SubjectName = "Gaming",

                },
                };

            foreach (Subject subject in subects)
            {
                context.Subjects.Add(subject);
            }
            context.SaveChanges();
        
        
            var questions = new Question[]
            {
                new Question
                {
                    UserID=userIds[0],
                    Title="Boil water",
                    Description="How to boil water",
                    Category="Cooking",
                    SubjectID=1,
                    DateTimeCreated="2020-9-19-11:35",
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="Craft table",
                    Description="To craft a table, you have to craft it.",
                    Category="Crafting",
                    SubjectID=2,
                    DateTimeCreated="2020-10-19-11:35",
                },
            };
            foreach (Question question in questions)
            {
                context.Questions.Add(question);
            }
            context.SaveChanges();

            var answers = new Answer[]
            {
                new Answer
                {
                    UserID=userIds[0],
                    QuestionID=1,
                    AnswerContent="Post content 1",
                    DateTimeCreated="2020-9-19-12:00",
                },
                new Answer
                {
                    UserID=userIds[1],
                    QuestionID=1,
                    AnswerContent="Post content 2",
                    DateTimeCreated="2020-9-19-12:30",
                },
                new Answer
                {
                    UserID=userIds[2],
                    QuestionID=2,
                    AnswerContent="Post content 1",
                    DateTimeCreated="2020-9-19-12:00",
                    
                },
            };
            foreach (Answer answer in answers)
            {
                context.Answers.Add(answer);
            }
            context.SaveChanges();
        }
    }
}
