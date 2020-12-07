using AbracadabraAPI.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class ExpertSubject
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
