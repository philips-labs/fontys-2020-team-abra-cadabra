using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class AnswerViewModel
    {
        [Key]
        public int ID { get; set; }

        public string AnswerContent { get; set; }

        public string UserName { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public int QuestionID { get; set; }
    }
}
