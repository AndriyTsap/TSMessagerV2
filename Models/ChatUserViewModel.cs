namespace signalr_test.Models
{
    public class ChatUserViewModel : IEntityBase
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
    }
}