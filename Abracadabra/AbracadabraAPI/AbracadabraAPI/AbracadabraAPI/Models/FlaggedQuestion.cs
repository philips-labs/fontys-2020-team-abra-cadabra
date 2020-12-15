using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class FlaggedQuestion
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
    }
}
