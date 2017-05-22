using Microsoft.EntityFrameworkCore;
using PhotoGallery.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PhotoGallery.Infrastructure
{
    public class PhotoGalleryContext : DbContext
    {
        private DbContextOptionsBuilder options;

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Groups { get; set; }
        public DbSet<ChatUser> GroupUsers { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<TemporaryUser> TemporaryUsers { get; set; }

        public PhotoGalleryContext(DbContextOptions options) : base(options)
        {
        }

        public PhotoGalleryContext(DbContextOptionsBuilder options)
        {
            this.options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }

            // Photos
            modelBuilder.Entity<Photo>().Property(p => p.Title).HasMaxLength(100);
            modelBuilder.Entity<Photo>().Property(p => p.AlbumId).IsRequired();

            // Album
            modelBuilder.Entity<Album>().Property(a => a.Title).HasMaxLength(100);
            modelBuilder.Entity<Album>().Property(a => a.Description).HasMaxLength(500);
            modelBuilder.Entity<Album>().HasMany(a => a.Photos).WithOne(p => p.Album);

            // User
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.HashedPassword).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.Salt).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().HasMany(u => u.ChatUsers).WithOne(gu => gu.User);
            //modelBuilder.Entity<User>().HasMany(u => u.Messages).WithOne(m => m.User);

            //Message
            modelBuilder.Entity<Message>().Property(m => m.Text).IsRequired().HasMaxLength(500);
            modelBuilder.Entity<Message>().Property(m => m.ChatId).IsRequired();
            modelBuilder.Entity<Message>().Property(m => m.SenderId).IsRequired();

            //Chat
            modelBuilder.Entity<Chat>().Property(g => g.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Chat>().HasMany(g => g.Messages).WithOne(m => m.Chat);
            modelBuilder.Entity<Chat>().HasMany(g => g.ChatUsers).WithOne(gu => gu.Chat);

            //GroupUser
            modelBuilder.Entity<ChatUser>().Property(gu => gu.ChatId).IsRequired();
            modelBuilder.Entity<ChatUser>().Property(gu => gu.UserId).IsRequired();

            // UserRole
            modelBuilder.Entity<UserRole>().Property(ur => ur.UserId).IsRequired();
            modelBuilder.Entity<UserRole>().Property(ur => ur.RoleId).IsRequired();

            // Role
            modelBuilder.Entity<Role>().Property(r => r.Name).IsRequired().HasMaxLength(50);

            //TemporaryUser
            modelBuilder.Entity<TemporaryUser>().Property(tu => tu.Email).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<TemporaryUser>().Property(tu => tu.Username).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<TemporaryUser>().Property(tu => tu.ActivationCode).IsRequired().HasMaxLength(50);
        }
    }
}
