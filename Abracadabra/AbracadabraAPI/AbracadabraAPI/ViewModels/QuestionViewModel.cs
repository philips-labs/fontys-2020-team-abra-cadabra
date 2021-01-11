using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using AbracadabraAPI.Models;

namespace AbracadabraAPI.ViewModels
{
    public class QuestionViewModel
    {
        [Key]
        public int ID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string SubjectName { get; set; }

        public string UserName { get; set; }

        public string UserRole { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public long Upvotes { get; set; }

        public long Downvotes { get; set; }

        public List<AnswerViewModel> AnswerViewModels { get; set; }

        public int VoteByUser { get; set; } = 0;

        public List<Tag> Tags { get; set; }
    }
}
