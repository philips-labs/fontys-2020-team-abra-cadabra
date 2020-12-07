using AbracadabraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class FlaggedQuestionViewModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int Count { get; set; }
        public Question Question { get; set; }
    }
}
