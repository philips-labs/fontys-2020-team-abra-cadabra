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
        public static QuestionViewModel QuestionToViewModel(Question question, IdentityUser user, AbracadabraContext _context) =>
        new QuestionViewModel
        {
            ID = question.ID,
            Title = question.Title,
            Description = question.Description,
            Category = question.Category,
            UserName = user.UserName,
            DateTimeCreated = question.DateTimeCreated,
            Answers = _context.Answers.Where(x => x.QuestionID == question.ID).ToList()
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
    }
}
