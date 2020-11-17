using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class Question
    {
        [Key]
        public int ID { get; set; }
        
        public string UserID { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public long Upvotes { get; set; }

        public long Downvotes { get; set; }

        public double? TrendingScore { get; set; }

        public int SubjectID { get; set; }

        public virtual List<Answer> Answers { get; set; }
    }
}
