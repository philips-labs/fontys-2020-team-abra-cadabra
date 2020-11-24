namespace AbracadabraAPI.Models
{
    public class AnswerVote
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public string UserId { get; set; }
        public int Vote { get; set; }
    }
}
