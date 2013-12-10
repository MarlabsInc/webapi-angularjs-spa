using System;
using ResourceMetadata.Data;

namespace ResourceMetadata.Data.Infrastructure 
{
    public interface IDatabaseFactory : IDisposable
    {
        ResourceManagerEntities Get();
    }
}
