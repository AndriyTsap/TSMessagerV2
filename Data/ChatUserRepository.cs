using System.Collections.Generic;
using signalr_test.Models;

namespace signalr_test.Data
{
    public class ChatUserRepository : EntityBaseRepository<ChatUser>, IChatUserRepository
    {
        public ChatUserRepository(IEnumerable<ChatUser> entities) : base(entities)
        {
        }
    }
}