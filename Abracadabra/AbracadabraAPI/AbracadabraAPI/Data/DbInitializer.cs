using AbracadabraAPI.Authentication;
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

            foreach (var user in context.Users)
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
                new Subject
                {
                    SubjectName = "Designing",
                },
                new Subject
                {
                    SubjectName = "Maths",
                },
                new Subject
                {
                    SubjectName = "Geography",
                },
                new Subject
                {
                    SubjectName = "History",
                },
                new Subject
                {
                    SubjectName = "Cinema",
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
                    IsAnsweredByExpert = true,
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
                new Question
                {
                    UserID=userIds[0],
                    Title="Where is Africa",
                    Description="Where can I find the African continent on the map?",
                    SubjectID=5,
                    DateTimeCreated=DateTime.Parse("2020-9-19-11:35"),
                    Upvotes = 50,
                    Downvotes = 30,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="Where is the Amazon Jungle located at?",
                    Description="I've always heard stories about it but I never knew where it was.",
                    SubjectID=5,
                    DateTimeCreated=DateTime.Parse("2020-10-19-11:35"),
                    Upvotes = 13,
                    Downvotes = 6,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Does Mount Everest really exist?",
                    Description="People say its the talles mountain in the world, but when I gaze out out of my window in Wales I can't see it. Whats up with that?",
                    SubjectID=5,
                    DateTimeCreated=DateTime.Now,
                    Upvotes = 0,
                    Downvotes = 25,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="Which cave is the deepest cave in the world?",
                    Description="I was looking at my broken sink's pipes when I thought of this question",
                    SubjectID=5,
                    DateTimeCreated=DateTime.Now.AddHours(1),
                    Upvotes = 218,
                    Downvotes = 52,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="Why is Math so boring?",
                    Description="Whenever I look at an algorithm I cannot stop yawning.?",
                    SubjectID=4,
                    DateTimeCreated=DateTime.Now.AddHours(2),
                    Upvotes = 400,
                    Downvotes = 991,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="What is the full length of pi",
                    Description="Is it that long?",
                    SubjectID=4,
                    DateTimeCreated=DateTime.Now.AddHours(6),
                    Upvotes = 5,
                    Downvotes = 12,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="My Math teacher hates me, what should I do?",
                    Description="My math teacher has a serious problem with me and I have no idea why that is. Can you help me?",
                    SubjectID=4,
                    DateTimeCreated=DateTime.Now.AddHours(4),
                    Upvotes = 223,
                    Downvotes = 73,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="How does a person get better at math?",
                    Description="My mom told me that a person is either good at maths from the beginning or bad at it forever, is this true? ",
                    SubjectID=4,
                    DateTimeCreated=DateTime.Now.AddHours(5),
                    Upvotes = 4221,
                    Downvotes = 2314,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Why is modern art so bad compared to the older art?",
                    Description="Seriously, how can anyone see a splash of red and blue pain on a white canvas and say its worth millions?",
                    SubjectID=3,
                    DateTimeCreated=DateTime.Parse("2020-9-19-11:35"),
                    Upvotes = 1050,
                    Downvotes = 10,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="How do I paint a tree like Bob Ross?",
                    Description="I've been meaning to paint trees like the way Bob Ross paints them, but every time I try to watch his lession I fall asleep. Please help.",
                    SubjectID=3,
                    DateTimeCreated=DateTime.Parse("2020-10-19-11:35"),
                    Upvotes = 553,
                    Downvotes = 90,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="I tried making a portrait of my wife, but it ended in divorce",
                    Description="My intentions were good, but my art technique wasn't. Any tips on how to improve my portrait paintings?",
                    SubjectID=3,
                    DateTimeCreated=DateTime.Now,
                    Upvotes = 123,
                    Downvotes = 122,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="Why is it so difficult to find a job after getting an Arts degree?",
                    Description="I know my family and friends kept telling me that painting is mostly a hobby, but I didn't realize it would be that bad. How do I find a job as a painter?",
                    SubjectID=3,
                    DateTimeCreated=DateTime.Now.AddHours(1),
                    Upvotes = 1238,
                    Downvotes = 45,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[1],
                    Title="Can I make transparent paint somehow?",
                    Description="Is it possible to make transparent paint, for a project that I'm currently working on?",
                    SubjectID=3,
                    DateTimeCreated=DateTime.Now.AddHours(2),
                    Upvotes = 231,
                    Downvotes = 20,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Where did the Thracians come from?",
                    Description="I know that the Thracians were situated on the Balkan Peninsula but where did they originate from?",
                    SubjectID=6,
                    DateTimeCreated=DateTime.Now.AddHours(3),
                    Upvotes = 5,
                    Downvotes = 0,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[2],
                    Title="The 'King' title",
                    Description="Where did the title 'King' originate from?",
                    SubjectID=6,
                    DateTimeCreated=DateTime.Now.AddHours(4),
                    Upvotes = 426,
                    Downvotes = 133,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="The best movie ever made",
                    Description="What movie is considered the best movie ever made, and who directed it?",
                    SubjectID=7,
                    DateTimeCreated=DateTime.Now.AddHours(5),
                    Upvotes = 11,
                    Downvotes = 2,
                    TrendingScore = null
                },
                new Question
                {
                    UserID=userIds[0],
                    Title="Schindler's List",
                    Description="Is Schindler's List a good movie? People have always been telling me about it, but its black and white so I figures its just an old movie.",
                    SubjectID=7,
                    DateTimeCreated=DateTime.Now.AddHours(5),
                    Upvotes = 521,
                    Downvotes = 54,
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