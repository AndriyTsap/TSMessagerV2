using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR; 
using PhotoGallery.Hubs;

namespace PhotoGallery.Controllers
{
    public abstract class ApiHubController<T> : Controller
        where T : Hub
    {
        private readonly IHubContext<Broadcaster> _hub;
        public IHubClients Clients { get; private set; }
        public IGroupManager Groups { get; private set; }
        protected ApiHubController()
        {
            Clients = _hub.Clients;
            Groups = _hub.Groups;
        }
    }
}