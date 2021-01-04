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

        public long Upvotes { get; set; } = 0;

        public long Downvotes { get; set; } = 0;

        public double? TrendingScore { get; set; }

        public bool IsAnsweredByExpert { get; set; } = false;

        public int SubjectID { get; set; }

        public virtual List<Answer> Answers { get; set; }

        public List<Tag> Tags { get; set; }
    }
}
