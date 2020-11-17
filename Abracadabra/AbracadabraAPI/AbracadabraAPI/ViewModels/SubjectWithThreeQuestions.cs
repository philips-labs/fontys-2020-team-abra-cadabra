using System;
using System.Collections.Generic;
using System.Linq;
using AbracadabraAPI.Models;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class SubjectWithThreeQuestions
    {
        public int ID { get; set; }
        public string SubjectName { get; set; }
        public List<string> QuestionTitles { get; set; }
    }
}
