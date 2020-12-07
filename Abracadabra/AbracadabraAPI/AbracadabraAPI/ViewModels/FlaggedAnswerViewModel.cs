using AbracadabraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class FlaggedAnswerViewModel
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public int Count { get; set; }
        public Answer Answer { get; set; }
    }
}
