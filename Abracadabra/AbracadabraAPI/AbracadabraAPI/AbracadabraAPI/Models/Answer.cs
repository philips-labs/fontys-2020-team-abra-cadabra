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

        public DateTime DateTimeCreated { get; set; }

        public int QuestionID { get; set; }

        public long Upvotes { get; set; }

        public long Downvotes { get; set; }
    }
}
