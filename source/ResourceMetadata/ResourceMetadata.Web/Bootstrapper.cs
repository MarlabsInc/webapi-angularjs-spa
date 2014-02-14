using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac;
using Autofac.Core;
using ResourceMetadata.Model;
using ResourceMetadata.Data;
using ResourceMetadata.Data.Repositories;
using System.Web.Http;
using Autofac.Integration.WebApi;
using Autofac.Integration.Mvc;
using System.Reflection;
using ResourceMetadata.Service;
using ResourceMetadata.Data.Infrastructure;
using ResourceMetadata.Web.Mappers;
using System.Web.Mvc;
using ResourceMetadata.Web.Controllers;


namespace ResourceMetadata
{
    public static class Bootstrapper
    {
        public static void Configure()
        {
            ConfigureAutofacContainer();
            AutoMapperConfiguration.Configure();
        }

        public static void ConfigureAutofacContainer()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterType<DatabaseFactory>().As<IDatabaseFactory>().AsImplementedInterfaces().InstancePerApiRequest();
            containerBuilder.RegisterType<UnitOfWork>().As<IUnitOfWork>().AsImplementedInterfaces().InstancePerApiRequest();
            containerBuilder.RegisterType<ResourceRepository>().As<IResourceRepository>().AsImplementedInterfaces().InstancePerApiRequest();
            containerBuilder.RegisterType<ResourceActivityRepository>().As<IResourceActivityRepository>().InstancePerApiRequest();
            containerBuilder.RegisterType<LocationRepository>().As<ILocationRepository>().InstancePerApiRequest();
            containerBuilder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerApiRequest();
            containerBuilder.RegisterType<ResourceService>().As<IResourceService>().InstancePerApiRequest();
            containerBuilder.RegisterType<ResourceActivityService>().As<IResourceActivityService>().InstancePerApiRequest();
            containerBuilder.RegisterType<LocationService>().As<ILocationService>().InstancePerApiRequest();
            containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerApiRequest();
            containerBuilder.RegisterApiControllers(System.Reflection.Assembly.GetExecutingAssembly());            
            IContainer container = containerBuilder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            //var mvcContainerBuilder = new ContainerBuilder();
            //mvcContainerBuilder.RegisterControllers(System.Reflection.Assembly.GetExecutingAssembly());
            //IContainer mvcContainer = mvcContainerBuilder.Build();
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacDependencyResolver(mvcContainer);
            
        }
    }
}