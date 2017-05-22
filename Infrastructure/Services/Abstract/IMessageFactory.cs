using PhotoGallery.Entities;

namespace PhotoGallery.Infrastructure.Services.Abstract
{
    public interface IMessageFactory
    {
        Message CreateMessage(string text, int userId, int groupId);
    }
}