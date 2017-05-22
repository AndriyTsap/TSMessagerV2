using System;
using System.Globalization;
using PhotoGallery.Entities;
using PhotoGallery.Infrastructure.Services.Abstract;

namespace PhotoGallery.Infrastructure.Services
{
    public class MessageFactory: IMessageFactory
    {
        public Message CreateMessage(string text, int userId, int groupId)
        {
            var message = new Message()
            {
                Date = DateTime.Now.ToString(CultureInfo.CurrentCulture),
                Text = text,
                ChatId = groupId,
                SenderId = userId
            };

            return message;
        }
    }
}