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

        public string Category { get; set; }

        public string DateTimeCreated { get; set; }

        public virtual List<Answer> Answers { get; set; }
    }
}
