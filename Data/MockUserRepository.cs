using System.Collections.Generic;
using signalr_test.Models;

namespace signalr_test.Data
{
    public class MockUserRepository : EntityBaseRepository<User>, IUserRepository
    {
        public MockUserRepository(MockData data) : base(data.users)
        {
        }
    }
}