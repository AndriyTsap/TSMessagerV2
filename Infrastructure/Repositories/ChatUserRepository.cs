using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoGallery.Entities;
using PhotoGallery.Infrastructure.Repositories.Abstract;

namespace PhotoGallery.Infrastructure.Repositories
{
    public class ChatUserRepository :EntityBaseRepository<ChatUser>, IChatUserRepository
    {
        public ChatUserRepository(PhotoGalleryContext context)
            : base(context)
        { }
    }
}
