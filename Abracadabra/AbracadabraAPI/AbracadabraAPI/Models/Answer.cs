using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class Answer
    {
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; }

        public string AnswerContent { get; set; }

        public string DateTimeCreated { get; set; }

        public int QuestionID { get; set; }
        public Question Question { get; set; }
    }
}
