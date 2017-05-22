using System.Collections.Generic;

namespace signalr_test.Models
{
    public class ChatViewModel : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DateCreated { get; set; }
        public string Type { get; set; }

        public ICollection<ChatUserViewModel> Users {get; set; }
    }
}