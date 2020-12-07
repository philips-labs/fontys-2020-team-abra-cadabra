﻿using System;
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
        public static QuestionViewModel QuestionToViewModel(Question question, ApplicationUser user, List<AnswerViewModel> viewModels, Subject subject, string role, int voteByUser = 0) =>
        new QuestionViewModel
        {
            ID = question.ID,
            Title = question.Title,
            Description = question.Description,
            UserName = user.UserName,
            SubjectName = subject?.SubjectName,
            DateTimeCreated = question.DateTimeCreated,
            AnswerViewModels = viewModels,
            Upvotes = question.Upvotes,
            Downvotes = question.Downvotes,
            UserRole = role,
            VoteByUser = voteByUser
        };

        public static QuestionWithAnswerCount QuestionWithAnswerCountToViewModel(Question question, IdentityUser user, int number) =>
        new QuestionWithAnswerCount
        {
            ID = question.ID,
            Title = question.Title,
            Description = question.Description,
            UserName = user.UserName,
            DateTimeCreated = question.DateTimeCreated,
            NumberOfAnswers = number
        };

        public static QuestionTitleViewModel QuestionToQuestionTitleViewModel(Subject subject, Question question) =>
        new QuestionTitleViewModel
        {
            Title = question.Title,
            TrendingScore = question.TrendingScore,
            SubjectID = subject.ID
        };

        public static AnswerViewModel AnswerToViewModel(Answer answer, ApplicationUser user, string role, int voteByUser = 0) =>
        new AnswerViewModel
        {
            ID = answer.ID,
            AnswerContent = answer.AnswerContent,
            UserName = user.UserName,
            DateTimeCreated = answer.DateTimeCreated,
            QuestionID = answer.QuestionID,
            Upvotes = answer.Upvotes,
            Downvotes = answer.Downvotes,
            UserRole = role,
            VoteByUser = voteByUser
        };

        public static UserViewModel UserToViewModel(ApplicationUser user, string role) 
        {
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
        public static SubjectViewModel SubjectToViewModel(Subject subject) =>
        new SubjectViewModel
        {
             ID = subject.ID,
             SubjectName = subject.SubjectName,
        };

        public static SubjectWithThreeQuestions SubjectWithThreeQuestionsToViewModel(Subject subject, List<string> titles) =>
        new SubjectWithThreeQuestions
        {
            ID = subject.ID,
            SubjectName = subject.SubjectName,
            QuestionTitles = titles,
        };
        public static SubjectWithQuestionsViewModel SubjectWithQuestionsToViewModel(Subject subject,List<QuestionWithAnswerCount> viewModels) =>
        new SubjectWithQuestionsViewModel
        {
            ID = subject.ID,
            SubjectName = subject.SubjectName,
            Questions= viewModels,
        };

        public static ShortApplicationViewModel ApplicationToShortViewModel(ExpertApplication application, Subject subject) =>
        new ShortApplicationViewModel
        {
            Status = application.Status.ToString(),
            DateTimeCreated = application.DateTimeCreated,
            SubjectName = subject.SubjectName
        };
    }
}