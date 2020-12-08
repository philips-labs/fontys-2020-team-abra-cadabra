using AbracadabraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class ShortApplicationViewModel
    {
        public string Status { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public string SubjectName { get; set; }
    }
}
