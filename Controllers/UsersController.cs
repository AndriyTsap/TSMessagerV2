using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using signalr_test.Data;
using PhotoGallery.Hubs;
using signalr_test.Models;
using AutoMapper;

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class UsersController: ApiHubController<Broadcaster>
    {
        IUserRepository _userRepository;
        IChatRepository _chatRepository;
        IChatUserRepository _chatUserRepository;
        public UsersController(
            IChatRepository chatRepository, 
            IUserRepository userRepository) 
        : base()
        {
            _chatRepository = chatRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IEnumerable<UserViewModel> Get()
        {
            IEnumerable<User> users = _userRepository.GetAll();
            IEnumerable<UserViewModel> usersVM = Mapper.Map<IEnumerable<User>, IEnumerable<UserViewModel>>(users);

            return usersVM;
        }

        [HttpPost]
        public async void Post([FromBody]int chatId, int userId)
        {
            _chatUserRepository.Add(new ChatUser() { UserId = userId, ChatId = chatId });
           
            await Clients.Group(chatId.ToString()).InvokeAsync("AddUser", userId.ToString());
        }
    }
}