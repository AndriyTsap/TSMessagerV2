using System;
using System.Collections.Generic;

namespace signalr_test.Models
{
    public class UserViewModel : IEntityBase
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string BirthDate { get; set; }
        public bool IsLocked { get; set; }
        public DateTime DateCreated { get; set; }
        public string Photo { get; set; }
        public string About { get; set; }

        public IEnumerable<ChatUserViewModel> ChatUsers { get; set; }
    }
}