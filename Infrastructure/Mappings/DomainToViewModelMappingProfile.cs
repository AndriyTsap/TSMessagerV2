using AutoMapper;
using PhotoGallery.Entities;
using PhotoGallery.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using signalr_test.Models;

namespace PhotoGallery.Infrastructure.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Photo, PhotoViewModel>()
               .ForMember(vm => vm.Uri, map => map.MapFrom(p => "/images/" + p.Uri));

            Mapper.CreateMap<Album, AlbumViewModel>()
                .ForMember(vm => vm.TotalPhotos, map => map.MapFrom(a => a.Photos.Count))
                .ForMember(vm => vm.Thumbnail, map =>
                    map.MapFrom(a => (a.Photos != null && a.Photos.Count > 0) ?
                    "/images/" + a.Photos.First().Uri :
                    "/images/thumbnail-default.png"));

            Mapper.CreateMap<signalr_test.Models.Chat, ChatViewModel>()
                .ForMember(vm => vm.Type, map => map.MapFrom(m => m.Type.ToString()))
                .ForMember(vm => vm.Users, map => map.MapFrom(m =>
                    Mapper.Map<ICollection<signalr_test.Models.ChatUser>, ICollection<UserViewModel>>(m.ChatUsers.OrderByDescending(u => u.Id).ToList())));
            Mapper.CreateMap<signalr_test.Models.User, UserViewModel>();
        }
    }
}
