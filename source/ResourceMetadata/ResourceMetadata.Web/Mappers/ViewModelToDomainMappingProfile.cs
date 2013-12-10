using AutoMapper;
using ResourceMetadata.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ResourceMetadata.Web.ViewModels;

namespace ResourceMetadata.Web.Mappers
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public override string ProfileName
        {
            get
            {
                return "ViewModelToDomainMappingProfile";
            }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<ResourceViewModel, Resource>();
            Mapper.CreateMap<LocationViewModel, Location>();
            Mapper.CreateMap<ResourceActivityViewModel, ResourceActivity>();
            Mapper.CreateMap<RegisterViewModel, User>();
        }
    }
}