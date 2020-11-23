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

           foreach(var user in context.Users)
            {
                userIds.Add(user.Id);
            }
            var subjects = new Subject[]
            {
                new Subject
                {
                    
                    SubjectName = "Cooking",

                },
                new Subject
                {
                    
                    SubjectName = "Crafting",

                },
                };

            foreach (Subject subject in subjects)
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
                    SubjectID=1,
                    DateTimeCreated=DateTime.Parse("2020-9-19-11:35"),
                    Upvotes = 150,
                    Downvotes = 20,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="Craft table",
                    Description="To craft a table, you have to craft it.",
                    SubjectID=2,
                    DateTimeCreated=DateTime.Parse("2020-10-19-11:35"),
                    Upvotes = 553,
                    Downvotes = 90,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Cook lobster",
                    Description="How to cook lobster",
                    SubjectID=1,
                    DateTimeCreated=DateTime.Now,
                    Upvotes = 10,
                    Downvotes = 15,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="Gym crafting question",
                    Description="How do I make a benchpress at home?",
                    SubjectID=2,
                    DateTimeCreated=DateTime.Now.AddHours(1),
                    Upvotes = 98,
                    Downvotes = 6,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="How to dice carrots?",
                    Description="How do I efficiently dice carrots?",
                    SubjectID=1,
                    DateTimeCreated=DateTime.Now.AddHours(2),
                    Upvotes = 991,
                    Downvotes = 400,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Glass Chair",
                    Description="How can I make a chair from glass?",
                    SubjectID=2,
                    DateTimeCreated=DateTime.Now.AddHours(3),
                    Upvotes = 45,
                    Downvotes = 40,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="How to make spaghetti?",
                    Description="How do I make spaghetti?",
                    SubjectID=1,
                    DateTimeCreated=DateTime.Now.AddHours(4),
                    Upvotes = 146,
                    Downvotes = 33,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="How to not hit my finger while using a hammer",
                    Description="Guys, I've hit tried getting this nail in the wall but I keep hitting my finger with the hammer what should I do?",
                    SubjectID=2,
                    DateTimeCreated=DateTime.Now.AddHours(5),
                    Upvotes = 21,
                    Downvotes = 4,
                    TrendingScore = null
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
                    DateTimeCreated=DateTime.Parse("2020-09-18 17:12"),
                },
                new Answer
                {
                    UserID=userIds[1],
                    QuestionID=1,
                    AnswerContent="Post content 2",
                    DateTimeCreated=DateTime.Parse("2020-10-01 12:56"),
                },
                new Answer
                {
                    UserID=userIds[2],
                    QuestionID=2,
                    AnswerContent="Post content 1",
                    DateTimeCreated=DateTime.Parse("2020-9-19-12:00"),
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
