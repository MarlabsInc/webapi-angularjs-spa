using ResourceMetadata.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using ResourceMetadata.Web.Helpers;

namespace ResourceMetadata.Web
{
    // Note: For instructions on enabling IIS7 classic mode, 
    // visit http://go.microsoft.com/fwlink/?LinkId=301868
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            GlobalConfiguration.Configuration.Filters.Add(new ResourceManagerAuthroize());
            Bootstrapper.Configure();
            Database.SetInitializer(new ResourceManagerDbInitializer());
        }
    }
}
