using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Models;
using AbracadabraAPI.Data;
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.Authentication;

namespace AbracadabraAPI.Mappers
{
    public static class Mapper
    {
        public static QuestionViewModel QuestionToViewModel(Question question, ApplicationUser user, List<AnswerViewModel> viewModels, Subject subject) =>
        new QuestionViewModel
        {
            ID = question.ID,
            Title = question.Title,
            Description = question.Description,
            Category = question.Category,
            UserName = user.UserName,
            SubjectSlug = subject?.SubjectName,
            DateTimeCreated = question.DateTimeCreated,
            AnswerViewModels = viewModels,
        };

        public static AnswerViewModel AnswerToViewModel(Answer answer, ApplicationUser user) =>
        new AnswerViewModel
        {
             ID = answer.ID,
             AnswerContent = answer.AnswerContent,
             UserName = user.UserName,
             DateTimeCreated = answer.DateTimeCreated,
             QuestionID = answer.QuestionID
        };

        public static UserViewModel UserToViewModel(ApplicationUser user, string role) {

            //var roles = await userManager.GetRolesAsync(user);

           return new UserViewModel
            {
                ID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Role = role,
                NrOfTimesReported = user.NrOfTimesReported,
                LastLoggedIn = user.LastLoggedIn,
                DateTimeCreated = user.DateTimeCreated
            };
        }
    }
}
