﻿namespace signalr_test.Models
{
    public class Message : IEntityBase
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int SenderId { get; set; }
        public int ChatId { get; set; }

    }
}
