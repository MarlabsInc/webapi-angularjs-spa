using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ResourceMetadata.Web.ViewModels;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using AutoMapper;
using System.Threading;
using Microsoft.AspNet.Identity;

namespace ResourceMetadata.Controllers
{
    public class LocationsController : ApiController
    {
        private readonly ILocationService locationService;
        //private readonly IUserService userService;
        private readonly UserManager<ApplicationUser> userManager;
        public LocationsController(ILocationService locationService, UserManager<ApplicationUser> userManager)
        {

            this.locationService = locationService;
            //this.userService = userService;
            this.userManager = userManager;
        }
        
        public IHttpActionResult Get()
        {
            string userEmail = Thread.CurrentPrincipal.Identity.Name;
            var user = userManager.FindByName(userEmail);

            if (user != null)
            {
                string userId = user.Id;
                var locations = locationService.GetLocationsByUserId(userId);
                var locationViewModels = new List<LocationViewModel>();
                Mapper.Map(locations, locationViewModels);
                return Ok(locationViewModels);
            }
            return InternalServerError();
        }

        public IHttpActionResult Get(int id)
        {
            var location = locationService.GetLocationById(id);
            var viewModel = new LocationViewModel();
            Mapper.Map(location, viewModel);
            return Ok(viewModel);
        }

        public IHttpActionResult Post(LocationViewModel location)
        {
            string userEmail = Thread.CurrentPrincipal.Identity.Name;
            var user = userManager.FindByName(userEmail);

            if (user != null)
            {
                Location entity = new Location();
                Mapper.Map(location, entity);
                entity.CreatedOn = DateTime.UtcNow;
                entity.UserId = user.Id;
                locationService.AddLocation(entity);
                Mapper.Map(entity, location);
                return Created(Url.Link("DefaultApi", new { controller = "Locations", id = location.Id }), location);
            }
            return InternalServerError();
        }

        public IHttpActionResult Put(int id, LocationViewModel locationViewModel)
        {
            string userEmail = Thread.CurrentPrincipal.Identity.Name;
            var user = userManager.FindByName(userEmail);

            if (user != null)
            {
                locationViewModel.Id = id;
                var location = locationService.GetLocationById(id);
                Mapper.Map(locationViewModel, location);
                location.UserId = user.Id;
                locationService.UpdateLoaction(location);
                return Ok(locationViewModel);
            }
            return InternalServerError();
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            locationService.DeleteLocation(id);
            return Ok();
        }

    }
}
