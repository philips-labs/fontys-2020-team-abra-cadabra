using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class ExpertApplication
    {
        [Key]
        public int ID { get; set; }

        public string Motivation { get; set; }

        public bool isApproved { get; set; } = false;

        public DateTime DateTimeCreated { get; set; }

        public int SubjectId { get; set; }

        public string UserId { get; set; }
    }
}
