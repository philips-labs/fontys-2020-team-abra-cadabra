namespace AbracadabraAPI.Models
{
    public class QuestionVote
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
        public int Vote { get; set; }
    }
}
