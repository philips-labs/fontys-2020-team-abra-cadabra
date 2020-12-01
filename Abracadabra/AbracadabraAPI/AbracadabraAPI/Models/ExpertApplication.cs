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

        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;

        public string ReviewedBy { get; set; } = null;

        public DateTime DateTimeCreated { get; set; }

        public DateTime ReviewedOn { get; set; }

        public int SubjectId { get; set; }

        public string UserId { get; set; }
    }
}
