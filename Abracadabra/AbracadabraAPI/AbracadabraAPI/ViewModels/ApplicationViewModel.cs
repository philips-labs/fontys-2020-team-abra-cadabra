using AbracadabraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class ApplicationViewModel
    {
        public string Motivation { get; set; }

        public ApplicationStatus Status { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public string SubjectName { get; set; }

        public string UserId { get; set; }
    }
}
