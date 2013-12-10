using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Model;

namespace ResourceMetadata.Data.Repositories
{
    public class LocationRepository : RepositoryBase<Location>, ILocationRepository
    {
        public LocationRepository(IDatabaseFactory dbFactory): base(dbFactory)
        {

        }
    }

    public interface ILocationRepository : IRepository<Location>
    {

    }
}
