using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using signalr_test.Models;

namespace signalr_test.Data
{
    public class MockChatRepository : EntityBaseRepository<Chat>, IChatRepository
    {
        public MockChatRepository(MockData data) : base(data.chats)
        {
        }

    }
}