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
        private readonly IUnitOfWork unitOfWork;
        public ResourceService(IResourceRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Resource> GetAllResourcesByUserId(int userId)
        {
            return repository.GetMany(res => res.Location.UserId == userId);
        }


        public IEnumerable<Resource> GetAllResources()
        {
            return repository.GetAll();
        }
        public Resource AddResource(Resource resource)
        {
            var existingResource = GetResourceByPriority(resource.Priority);
            if (existingResource != null)
            {
                repository.Delete(existingResource);
            }

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
            var existingResource = GetResourceByPriority(resource.Priority);

            if (existingResource != null && existingResource.Id !=  resource.Id)
            {
                repository.Delete(existingResource);
            }

            repository.Update(resource);
            SaveChanges();
            return resource;
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

        public IEnumerable<Resource> GetTopFiveResourcesByUserId(int userId)
        {
            var resources = repository.GetMany(res => res.Location.UserId == userId).OrderBy(res => res.Priority).Take(5);
            return resources;
        }
    }



    public interface IResourceService : IUnitOfWork
    {
        Resource AddResource(Resource resource);
        IEnumerable<Resource> GetAllResources();

        Resource GetResourceById(int id);

        Resource UpdateResource(Resource resource);

        void DeleteResource(int id);

        Resource GetResourceByPriority(int priority);

        IEnumerable<Resource> GetAllResourcesByUserId(int userId);

        IEnumerable<Resource> GetTopFiveResourcesByUserId(int userId);
    }
}
