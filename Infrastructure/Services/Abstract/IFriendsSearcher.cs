using System.Collections.Generic;
using System.Threading.Tasks;
using PhotoGallery.Entities;

namespace PhotoGallery.Infrastructure.Services.Abstract
{
    public interface IFriendsSearcher
    {
        Task<bool> ValidateFriend(int userId1, int userId2);
        Task<IEnumerable<User>> GetFriends(int userId);
    }
}