using AutoMapper;
using ResourceMetadata.Model;
using ResourceMetadata.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ResourceMetadata.Web.ViewModels;

namespace ResourceMetadata.Web.Mappers
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public override string ProfileName
        {
            get
            {
                return "DomainToViewModelMappingProfile";
            }
        }


        protected override void Configure()
        {
            Mapper.CreateMap<Resource, ResourceViewModel>();
            Mapper.CreateMap<Location, LocationViewModel>();
            Mapper.CreateMap<ResourceActivity,ResourceActivityViewModel>()
                .ForMember(vm => vm.ActivityDateString, dm=> dm.MapFrom(dModel => dModel.ActivityDate.ToLongDateString()));
            Mapper.CreateMap<ApplicationUser, RegisterViewModel>();
        }
    }
}