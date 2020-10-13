using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class AnswerDTO
    {
        [Key]
        public int ID { get; set; }

        public string AnswerContent { get; set; }

        public string DateTimeCreated { get; set; }
    }
}
