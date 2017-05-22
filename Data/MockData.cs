using System;
using System.Collections.Generic;
using signalr_test.Models;

namespace signalr_test.Data
{
    public class MockData
    {
        public List<Chat> chats = new List<Chat>()
        {
            new Chat()
            {
                Id = 1,
                Name = "andriy-taras",
                DateCreated = DateTime.Now.ToString(),
                Type = "Dialog"
            },
            new Chat()
            {
                Id = 2,
                Name = "PIt-15-3",
                DateCreated = DateTime.Now.ToString(),
                Type = "Converstation"
            }
        };

        public List<User> users = new List<User>()
        {
            new User()
            {
                Id = 0,
                Username = "Andriy",
                Email = "tsap.andriy@gmail.com",
                FirstName = "Andriy",
                LastName = "Tsap",
                Phone = "0990920654",
                BirthDate = "16.10.1996",
                HashedPassword = "asdasdasdasdhaskjda8979adasiu",
                Salt = "jahdausdhasfyw8yfs0",
                IsLocked = false,
                DateCreated = DateTime.Now,
                Photo = "sdhjdgasfjgdsj",
                About = "Hi, i am Andriy and..."
            },
            new User()
            {
                Id = 1,
                Username = "Taras",
                Email = "tsap.taras@gmail.com",
                FirstName = "Taras",
                LastName = "Tsap",
                Phone = "0990920654",
                BirthDate = "16.05.1996",
                HashedPassword = "asdasdasdasdhaskjda8979adasiu",
                Salt = "jahdausdhasfyw8yfs0",
                IsLocked = false,
                DateCreated = DateTime.Now,
                Photo = "sdhjdgasfjgdsj",
                About = "Hi, i am Taras and..."
            }
        };

        public static List<ChatUser> chatUsers = new List<ChatUser>()
        {
            new ChatUser()
            {
                Id = 0,
                UserId = 0,
                ChatId = 0,
            },
            new ChatUser()
            {
                Id = 1,
                UserId = 1,
                ChatId = 0
            }
        };
    }
}