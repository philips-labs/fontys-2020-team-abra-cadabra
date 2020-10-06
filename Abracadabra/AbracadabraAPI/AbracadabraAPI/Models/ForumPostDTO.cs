using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class ForumPostDTO
    {
        [Key]
        public int ID { get; set; }

        public string PostContent { get; set; }

        public string DateTimeCreated { get; set; }
    }
}
