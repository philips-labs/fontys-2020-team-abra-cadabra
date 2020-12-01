using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class ApplicationViewModel
    {
        public string Motivation { get; set; }

        public bool isApproved { get; set; } = false;

        public DateTime DateTimeCreated { get; set; }

        public string SubjectName { get; set; }

        public string UserId { get; set; }
    }
}
