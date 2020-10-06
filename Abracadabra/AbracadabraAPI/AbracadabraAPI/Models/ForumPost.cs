using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class ForumPost
    {
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; }

        public string PostContent { get; set; }

        public string DateTimeCreated { get; set; }

        public int ForumThreadID { get; set; }

        //public virtual ForumThread ForumThread { get; set; }
    }
}
