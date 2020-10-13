using System.Collections.Generic;

namespace AbracadabraAPI.Models
{
    public class Subject
    {
        public int ID { get; set; }
        public string SubjectName { get; set; }
        public virtual List<Question> Questions { get; set; }
    }
}
