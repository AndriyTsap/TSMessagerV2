using signalr_test.Models;

namespace signalr_test.Data
{
    public interface IChatRepository : IEntityBaseRepository<Chat> { }

    public interface IUserRepository : IEntityBaseRepository<User> { }

    public interface IChatUserRepository : IEntityBaseRepository<ChatUser> { }

}
