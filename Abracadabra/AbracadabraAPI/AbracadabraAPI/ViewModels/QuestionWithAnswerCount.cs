using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class QuestionWithAnswerCount
    {
        [Key]
        public int ID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }
        public string SubjectSlug { get; set; }

        public string UserName { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public int numberOfAnswers { get; set; }
    }
}
