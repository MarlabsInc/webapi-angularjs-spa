using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void SaveChanges();
    }
}
