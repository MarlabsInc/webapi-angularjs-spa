using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ResourceMetadata.API.ViewModels;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using AutoMapper;
using System.Threading;
using Microsoft.AspNet.Identity;

namespace ResourceMetadata.API.Controllers
{

    public class LocationsController : ApiController
    {
        private readonly ILocationService locationService;
        private readonly UserManager<ApplicationUser> userManager;

        public LocationsController(ILocationService locationService, UserManager<ApplicationUser> userManager)
        {

            this.locationService = locationService;
            this.userManager = userManager;
        }

        public IHttpActionResult Get()
        {
            var locations = locationService.GetLocations();
            var locationViewModels = new List<LocationViewModel>();
            Mapper.Map(locations, locationViewModels);
            return Ok(locationViewModels);
        }

        public IHttpActionResult Get(int id)
        {
            var location = locationService.GetLocationById(id);
            var viewModel = new LocationViewModel();
            Mapper.Map(location, viewModel);
            return Ok(viewModel);
        }


        [Authorize(Roles = "Admin")]
        public IHttpActionResult Post(LocationViewModel location)
        {
            Location entity = new Location();
            Mapper.Map(location, entity);
            entity.CreatedOn = DateTime.UtcNow;
            locationService.AddLocation(entity);
            Mapper.Map(entity, location);
            return Created(Url.Link("DefaultApi", new { controller = "Locations", id = location.Id }), location);
        }

        [Authorize(Roles = "Admin")]
        public IHttpActionResult Put(int id, LocationViewModel locationViewModel)
        {
            locationViewModel.Id = id;
            var location = locationService.GetLocationById(id);
            Mapper.Map(locationViewModel, location);
            locationService.UpdateLoaction(location);
            return Ok(locationViewModel);
        }

        [Authorize(Roles = "Admin")]
        public IHttpActionResult Delete(int id)
        {
            locationService.DeleteLocation(id);
            return Ok();
        }

    }
}
