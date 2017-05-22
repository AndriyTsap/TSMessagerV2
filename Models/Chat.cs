using System.Collections.Generic;

namespace signalr_test.Models
{
    public class Chat : IEntityBase
    {
        public Chat ()
        {
            ChatUsers = new List<ChatUser>();
            Messages = new List<Message>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string DateCreated { get; set; }
        public string Type { get; set; }

        public virtual List<ChatUser> ChatUsers { get; set; }
        public virtual List<Message> Messages { get; set; }

        public override bool Equals(object obj)
        {
            var chat = obj as Chat;
            return chat != null && Id == chat.Id && Name == chat.Name && DateCreated == chat.DateCreated;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
