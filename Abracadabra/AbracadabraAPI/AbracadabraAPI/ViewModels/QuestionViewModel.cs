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

        public string Category { get; set; }

        public string UserName { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public List<Answer> Answers { get; set; }
    }
}
