using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Data.Repositories
{
    public class UserRepository : RepositoryBase<ApplicationUser>, IUserRepository
    {

        public UserRepository(IDatabaseFactory dbFactory): base(dbFactory)
        {

        } 
    }


    public interface IUserRepository : IRepository<ApplicationUser>
    { 
    }
}
