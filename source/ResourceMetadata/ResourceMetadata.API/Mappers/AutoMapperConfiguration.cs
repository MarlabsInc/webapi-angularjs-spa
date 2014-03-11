using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResourceMetadata.API.Mappers
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(mapper =>
            { 
                mapper.AddProfile<ViewModelToDomainMappingProfile>() ;
                mapper.AddProfile<DomainToViewModelMappingProfile>();
            });
            
        }
    }
}