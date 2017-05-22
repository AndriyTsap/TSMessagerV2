using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace PhotoGallery.Entities
{
    public class Message : IEntityBase
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int SenderId { get; set; }
        public int ChatId { get; set; }

        //public virtual User User { get; set; }
        public virtual Chat Chat { get; set; }

        public override bool Equals(object obj)
        {
            var message = obj as Message;
            return message != null && Id == message.Id && Text == message.Text && Date == message.Date &&
                   SenderId == message.SenderId && ChatId == message.ChatId;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
