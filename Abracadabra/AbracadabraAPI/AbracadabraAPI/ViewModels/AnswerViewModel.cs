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

        public string UserRole { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public long Upvotes { get; set; } = 0;

        public long Downvotes { get; set; } = 0;

        public int QuestionID { get; set; }

        public int VoteByUser { get; set; } = 0;
    }
}
