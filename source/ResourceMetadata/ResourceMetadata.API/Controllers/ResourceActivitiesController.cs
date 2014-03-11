using AutoMapper;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using ResourceMetadata.API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResourceMetadata.API.Controllers
{ 
    public class ResourceActivitiesController : ApiController
    {
        private readonly IResourceActivityService activityService;

        public ResourceActivitiesController(IResourceActivityService activityService)
        {
            this.activityService = activityService;
        }

        [Route("api/Resources/{resourceId}/Activities")]
        public IHttpActionResult Get(int resourceId)
        {
            var activities = activityService.GetActivitiesByResourceId(resourceId);
            IList<ResourceActivityViewModel> activityViewModel = new List<ResourceActivityViewModel>();
            Mapper.Map(activities, activityViewModel);
            return Ok(activityViewModel);
        }

        [Route("api/Resources/{resourceId}/Activities")]
        public IHttpActionResult Post(int resourceId, ResourceActivityViewModel activity)
        {
            var entity = new ResourceActivity();
            Mapper.Map(activity, entity);
            activityService.AddResourceActivity(entity);
            activity.Id = entity.Id;
            return Created(Url.Link("DefaultApi", new { controller = "ResourceActivities", id = activity.Id }), activity);
        }

        [Route("api/ResourceActivities/{id}")]
        public IHttpActionResult Delete(int id)
        {
            activityService.DeleteActivity(id);
            return Ok();
        }

    }
}