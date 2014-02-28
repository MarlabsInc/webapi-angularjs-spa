using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Data.Repositories;
using ResourceMetadata.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Service
{
    public class ResourceActivityService : IResourceActivityService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IResourceActivityRepository activityRepository;
        public ResourceActivityService(IUnitOfWork unitOfWork, IResourceActivityRepository activityRepository)
        {
            this.unitOfWork = unitOfWork;
            this.activityRepository = activityRepository;
        }

        public ResourceActivity AddResourceActivity(ResourceActivity activity)
        {
            activityRepository.Add(activity);
            SaveChanges();
            return activity;
        }

        public void DeleteActivity(int id)
        {
            var activity = activityRepository.GetById(id);
            activityRepository.Delete(activity);
            SaveChanges();
        }
        public IEnumerable<ResourceActivity> GetActivitiesByResourceId(int resourceId)
        {
            var activities = activityRepository.GetMany(act => act.ResourceId == resourceId);
            return activities;
        }
        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }
    }

    public interface IResourceActivityService 
    {
        ResourceActivity AddResourceActivity(ResourceActivity activity);
        void DeleteActivity(int id);
        IEnumerable<ResourceActivity> GetActivitiesByResourceId(int resourceId);
    }
}
