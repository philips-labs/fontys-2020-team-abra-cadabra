using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbracadabraAPI.Models;
using AbracadabraAPI.Data;
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace AbracadabraAPI.Mappers
{
    public static class Mapper
    {
        public static QuestionViewModel QuestionToViewModel(Question question, IdentityUser user, List<AnswerViewModel> viewModels, Subject subject) =>
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
        public static QuestionWithNoAnswersViewModel QuestionWithNoAnswersToViewModel(Question question, IdentityUser user) =>
            new QuestionWithNoAnswersViewModel
            {
                ID = question.ID,
                Title = question.Title,
                Description = question.Description,
                Category = question.Category,
                UserName = user.UserName,
                DateTimeCreated = question.DateTimeCreated,
            };
        public static QuestionWithAnswerCount QuestionWithAnswerCountToViewModel(Question question, IdentityUser user, int number) =>
        new QuestionWithAnswerCount
            {
                ID = question.ID,
                Title = question.Title,
                Description = question.Description,
                Category = question.Category,
                UserName = user.UserName,
                DateTimeCreated = question.DateTimeCreated,
                numberOfAnswers = number,
            };

        public static AnswerViewModel AnswerToViewModel(Answer answer, IdentityUser user) =>
        new AnswerViewModel
        {
            ID = answer.ID,
            AnswerContent = answer.AnswerContent,
            UserName = user.UserName,
            DateTimeCreated = answer.DateTimeCreated,
            QuestionID = answer.QuestionID
        };
        public static SubjectViewModel SubjectToViewModel(Subject subject) =>
            new SubjectViewModel
            {
                ID = subject.ID,
                SubjectName = subject.SubjectName,
            };
        public static SubjectWithQuestionsViewModel SubjectWithQuestionsToViewModel(Subject subject,List<QuestionWithAnswerCount> viewModels) =>
    new SubjectWithQuestionsViewModel
    {
        ID = subject.ID,
        SubjectName = subject.SubjectName,
        Questions= viewModels,
    };
    }
}
