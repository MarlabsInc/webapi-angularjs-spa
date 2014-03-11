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
    public class ResourcesController : ApiController
    {
        private readonly IResourceService resourceService;
        private readonly UserManager<ApplicationUser> userManager;
        public ResourcesController(IResourceService resourceService, UserManager<ApplicationUser> userManager)
        {
            this.resourceService = resourceService;
            this.userManager = userManager;
        }
        public IHttpActionResult Get()
        {
            string userEmail = RequestContext.Principal.Identity.Name;
            var user = userManager.FindByName(userEmail);

            if (user != null)
            {
                var resources = resourceService.GetAllResourcesByUserId(user.Id).ToList();
                IList<ResourceViewModel> viewModel = new List<ResourceViewModel>();
                Mapper.Map(resources, viewModel);
                return Ok(viewModel);
            }
            return InternalServerError();
        }


        public IHttpActionResult GetTopFiveResources(int count)
        {
            string userEmail = RequestContext.Principal.Identity.Name;
            var user = userManager.FindByName(userEmail);

            if (user != null)
            {
                IList<ResourceViewModel> viewModel = new List<ResourceViewModel>();
                var resources = resourceService.GetTopFiveResourcesByUserId(user.Id);
                Mapper.Map(resources, viewModel);
                return Ok(viewModel);
            }
            return InternalServerError();
        }

        public IHttpActionResult GetResourceById(int id)
        {
            Resource resource = resourceService.GetResourceById(id);
            var viewModel = new ResourceViewModel();
            Mapper.Map(resource, viewModel);
            return Ok(viewModel);

        }


        public IHttpActionResult PostResource(ResourceViewModel resourceViewModel)
        {
            Resource resource = new Resource();
            Mapper.Map(resourceViewModel, resource);
            resource.CreatedOn = DateTime.Now;
            resource = resourceService.AddResource(resource);
            Mapper.Map(resource, resourceViewModel);
            return Created(Url.Link("DefaultApi", new { controller = "Resources", id = resourceViewModel.Id }), resourceViewModel);
        }

        public IHttpActionResult PutResource(int id, ResourceViewModel resourceViewModel)
        {
            resourceViewModel.Id = id;
            var resource = resourceService.GetResourceById(id);
            Mapper.Map(resourceViewModel, resource);
            resourceService.UpdateResource(resource);
            return Ok(resourceViewModel);
        }

        public IHttpActionResult DeleteResource(int id)
        {
            resourceService.DeleteResource(id);
            return Ok();
        }

    }
}