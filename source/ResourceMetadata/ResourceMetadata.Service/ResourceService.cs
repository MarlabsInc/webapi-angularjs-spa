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
    public class ResourceService : IResourceService
    {
        private IResourceRepository repository;
        private IResourceActivityRepository activityRepository;
        private readonly IUnitOfWork unitOfWork;
        public ResourceService(IResourceRepository repository, IResourceActivityRepository activityRepository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.activityRepository = activityRepository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Resource> GetAllResourcesByUserId(string userId)
        {
            return repository.GetMany(res => res.UserId == userId);
        }


        public IEnumerable<Resource> GetAllResources()
        {
            return repository.GetAll();
        }
        public Resource AddResource(Resource resource)
        {
            repository.Add(resource);
            unitOfWork.SaveChanges();
            return resource;
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }

        public Resource GetResourceById(int id)
        {
            return repository.GetById(id);
        }

        public Resource UpdateResource(Resource resource)
        {
            try
            {
                repository.Update(resource);
                SaveChanges();
                return resource;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void DeleteResource(int id)
        {
            var resource = repository.GetById(id);
            repository.Delete(resource);
            SaveChanges();
        }

        public Resource GetResourceByPriority(int priority)
        {
            var resource = repository.GetMany(res => res.Priority == priority).FirstOrDefault();
            return resource;
        }

        public IEnumerable<Resource> GetTopFiveResourcesByUserId(string userId)
        {
            var resources = repository.Query(res => res.UserId == userId).OrderBy(res => res.Priority).Take(5);
            return resources;
        }

        public IEnumerable<Resource> GetPagedResourcesByUserId(string userId, int count, int page, string sortField, string sortOrder, ref int totalCount)
        {
            var query = repository.Query(res => res.UserId == userId);

            switch (sortField)
            {
                case "Description":
                    {
                        query = sortOrder.ToLower() == "asc" ? query.OrderBy(res => res.Description) : query.OrderByDescending(res => res.Description);
                        break;
                    }
                default:
                    {
                        query = sortOrder.ToLower() == "asc" ? query.OrderBy(res => res.Name) : query.OrderByDescending(res => res.Name);
                        break;
                    }
            }

            totalCount = query.Count();
            var resources = query.Skip((page - 1) * count).Take(count);
            return resources;
        }
    }



    public interface IResourceService
    {
        Resource AddResource(Resource resource);
        IEnumerable<Resource> GetAllResources();

        Resource GetResourceById(int id);

        Resource UpdateResource(Resource resource);

        void DeleteResource(int id);

        Resource GetResourceByPriority(int priority);

        IEnumerable<Resource> GetAllResourcesByUserId(string userId);

        IEnumerable<Resource> GetTopFiveResourcesByUserId(string userId);

        IEnumerable<Resource> GetPagedResourcesByUserId(string userId, int count, int page, string sortField, string sortOrder, ref int totalCount);
    }
}
