using ResourceMetadata.Data;
using ResourceMetadata.Model;

namespace ResourceMetadata.Data.Infrastructure 
{
public class DatabaseFactory : Disposable, IDatabaseFactory
{
    private ResourceManagerEntities dataContext;
    public ResourceManagerEntities Get()
    {
        return dataContext ?? (dataContext = new ResourceManagerEntities());
    }
    protected override void DisposeCore()
    {
        if (dataContext != null)
            dataContext.Dispose();
    }
}
}
