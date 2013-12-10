using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Data.Repositories
{
    public class ResourceActivityRepository : RepositoryBase<ResourceActivity>, IResourceActivityRepository
    {
        public ResourceActivityRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {

        }


    }

    public interface IResourceActivityRepository : IRepository<ResourceActivity>
    {

    }
}
