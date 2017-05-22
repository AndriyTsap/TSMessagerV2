using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using signalr_test.Models;

namespace PhotoGallery.Hubs
{
    [HubName("broadcaster")]
    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Subscribe(int chatId)
        {
            System.Console.WriteLine(chatId);
            return Groups.Add(Context.ConnectionId, chatId.ToString());
        }

        public Task Unsubscribe(int chatId)
        {
            return Groups.Remove(Context.ConnectionId, chatId.ToString());
        }
    }

    // Client side methods to be invoked by Broadcaster Hub
    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task UpdateChat(ChatViewModel chat);
        Task AddUser(UserViewModel user);
        Task AddChatMessage(Message message);
    }
}