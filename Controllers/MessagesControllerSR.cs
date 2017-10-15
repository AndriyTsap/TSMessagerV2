using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PhotoGallery.Hubs;
using signalr_test.Models;

namespace PhotoGallery.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : ApiHubController<Broadcaster>
    {
        public MessageController() : base()
        {           
        }

        [HttpPost]
        public void Post([FromBody]dynamic message)
        {
            System.Console.WriteLine(message.ChatId.ToString());
            this.Clients.Group(message.ChatId.ToString()).AddChatMessage(message);
        }
    }
}