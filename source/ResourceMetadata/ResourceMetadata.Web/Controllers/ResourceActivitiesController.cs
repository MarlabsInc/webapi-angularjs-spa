using AutoMapper;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using ResourceMetadata.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResourceMetadata.Web.Controllers
{

    public class ResourceActivitiesController : ApiController
    {
        private readonly IResourceActivityService activityService;

        public ResourceActivitiesController(IResourceActivityService activityService)
        {
            this.activityService = activityService;
        }

        [HttpGet("api/Resources/{resourceId}/Activities")]
        public IHttpActionResult Get(int resourceId)
        {
            var activities = activityService.GetActivitiesByResourceId(resourceId);
            IList<ResourceActivityViewModel> activityViewModel = new List<ResourceActivityViewModel>();
            Mapper.Map(activities, activityViewModel);
            return Ok(activityViewModel);
        }

        [HttpPost("api/Resources/{resourceId}/Activities")]
        public IHttpActionResult Post(int resourceId, ResourceActivityViewModel activity)
        {
            var entity = new ResourceActivity();
            Mapper.Map(activity, entity);
            activityService.AddResourceActivity(entity);
            activity.Id = entity.Id;
            return Created(Url.Link("DefaultApi", new { controller = "ResourceActivities", id = activity.Id }), activity);
        }

        [HttpDelete("api/ResourceActivities/{activityId}")]
        public IHttpActionResult Delete(int activityId)
        {
            activityService.DeleteActivity(activityId);
            return Ok();
        }

    }
}