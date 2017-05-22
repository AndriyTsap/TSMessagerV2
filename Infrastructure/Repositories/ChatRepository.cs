using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoGallery.Entities;
using PhotoGallery.Infrastructure.Repositories.Abstract;

namespace PhotoGallery.Infrastructure.Repositories
{
    public class ChatRepository :EntityBaseRepository<Chat>, IChatRepository
    {
        public ChatRepository(PhotoGalleryContext context)
            : base(context)
        { }
    }
}
