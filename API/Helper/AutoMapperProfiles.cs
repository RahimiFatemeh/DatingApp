using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extension;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Photo , PhotoDto>();

        }
        

    }
}