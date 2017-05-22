namespace signalr_test.Models
{
    public class ChatUser : IEntityBase
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }

        public virtual User User { get; set; }
        public virtual Chat Chat { get; set; }

        public override bool Equals(object obj)
        {
            var chatUser = obj as ChatUser;
            return chatUser != null && Id == chatUser.Id && ChatId == chatUser.ChatId && UserId == chatUser.UserId;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
