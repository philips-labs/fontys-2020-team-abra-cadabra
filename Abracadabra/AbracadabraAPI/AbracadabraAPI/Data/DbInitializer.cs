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

            if (context.ForumThreads.Any())
            {
                return;
            }
            List<string> userIds = new List<string>();

            for (int i = 0; i < context.Users.Count(); i++)
            {
                userIds.Add(context.Users.Where(x => x.UserName == $"test{i}").FirstOrDefault().Id);
            }

            var forumThreads = new ForumThread[]
            {
                new ForumThread
                {
                    UserID=userIds[0],
                    Title="Boil water",
                    Description="How to boil water",
                    Category="Cooking",
                    DateTimeCreated="2020-9-19-11:35",
                },
                new ForumThread
                {
                    UserID=userIds[1],
                    Title="Craft table",
                    Description="To craft a table, you have to craft it.",
                    Category="Crafting",
                    DateTimeCreated="2020-10-19-11:35",
                },
            };
            foreach (ForumThread forumThread in forumThreads)
            {
                context.ForumThreads.Add(forumThread);
            }
            context.SaveChanges();

            var forumPosts = new ForumPost[]
            {
                new ForumPost
                {
                    UserID=userIds[0],
                    ForumThreadID=1,
                    PostContent="Post content 1",
                    DateTimeCreated="2020-9-19-12:00",
                },
                new ForumPost
                {
                    UserID=userIds[1],
                    ForumThreadID=1,
                    PostContent="Post content 2",
                    DateTimeCreated="2020-9-19-12:30",
                },
                new ForumPost
                {
                    UserID=userIds[2],
                    ForumThreadID=2,
                    PostContent="Post content 1",
                    DateTimeCreated="2020-9-19-12:00",
                },
            };
            foreach (ForumPost forumPost in forumPosts)
            {
                context.ForumPosts.Add(forumPost);
            }
            context.SaveChanges();
        }
    }
}
