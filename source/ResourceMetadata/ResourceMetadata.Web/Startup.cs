using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ResourceMetadata.Web.Startup))]
namespace ResourceMetadata.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
