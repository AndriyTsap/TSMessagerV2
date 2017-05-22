using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using signalr_test.Data;
using PhotoGallery.Hubs;
using signalr_test.Models;

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class ChatsController : ApiHubController<Broadcaster>
    {

        private IChatRepository _chatRepository;
        public ChatsController(IConnectionManager signalRConnectionManager, 
            IChatRepository chatRepository)
        : base(signalRConnectionManager)
        {
            _chatRepository = chatRepository;
        }
        [HttpGet]
        public IEnumerable<ChatViewModel> Get()
        {
            IEnumerable<Chat> chats = _chatRepository.GetAll();
            IEnumerable<ChatViewModel> chatsVM = Mapper.Map<IEnumerable<Chat>, IEnumerable<ChatViewModel>>(chats);

            return chatsVM;
        }    
        
    }
}