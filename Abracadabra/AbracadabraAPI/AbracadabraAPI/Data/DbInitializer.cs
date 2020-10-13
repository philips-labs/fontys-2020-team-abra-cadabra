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

            var questions = new Question[]
            {
                new Question
                {
                    UserID=userIds[0],
                    Title="Boil water",
                    Description="How to boil water",
                    Category="Cooking",
                    DateTimeCreated="2020-9-19-11:35",
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="Craft table",
                    Description="To craft a table, you have to craft it.",
                    Category="Crafting",
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
                    DateTimeCreated=DateTime.Parse("2020-10-08 13:34"),
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
