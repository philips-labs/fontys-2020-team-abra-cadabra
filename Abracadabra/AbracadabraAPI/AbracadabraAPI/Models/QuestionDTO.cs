using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AbracadabraAPI.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class QuestionDTO
    {
        [Key]
        public int ID { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public List<AnswerViewModel> Answers { get; set; }
    }
}
