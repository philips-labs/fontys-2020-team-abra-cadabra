using System;
namespace AbracadabraAPI.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string TagName { get; set; }
    }
}
