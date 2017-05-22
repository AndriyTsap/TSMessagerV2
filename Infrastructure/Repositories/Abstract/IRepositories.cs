using System.Collections.Generic;
using PhotoGallery.Entities;

namespace PhotoGallery.Infrastructure.Repositories.Abstract
{
    public interface IAlbumRepository : IEntityBaseRepository<Album> { }

    public interface ILoggingRepository : IEntityBaseRepository<Error> { }

    public interface IPhotoRepository : IEntityBaseRepository<Photo> { }

    public interface IRoleRepository : IEntityBaseRepository<Role> { }

    public interface IMessageRepository : IEntityBaseRepository<Message> { }

    public interface IChatRepository : IEntityBaseRepository<Chat> { }

    public interface IChatUserRepository : IEntityBaseRepository<ChatUser> { }

    public interface ITemporaryUserRepository : IEntityBaseRepository<TemporaryUser> { }

    public interface IUserRepository : IEntityBaseRepository<User>
    {
        User GetSingleByUsername(string username);
        IEnumerable<Role> GetUserRoles(string username);
    }

    public interface IUserRoleRepository : IEntityBaseRepository<UserRole> { }
}
