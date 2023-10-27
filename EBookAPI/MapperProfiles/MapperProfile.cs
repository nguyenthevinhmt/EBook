﻿using AutoMapper;
using EBook.Dtos.Users;
using EBook.Entities;

namespace BookManagement.Entities.MapperProfiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, CreateUserDto>();
            CreateMap<User, UserDto>();
        }
    }
}
