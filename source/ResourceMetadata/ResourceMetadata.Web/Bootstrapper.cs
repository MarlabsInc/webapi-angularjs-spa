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
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ResourceMetadata.Web.Providers;


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
            //var containerBuilder = new ContainerBuilder();
            //containerBuilder.RegisterType<DatabaseFactory>().As<IDatabaseFactory>().AsImplementedInterfaces().InstancePerApiRequest();
            //containerBuilder.RegisterType<UnitOfWork>().As<IUnitOfWork>().AsImplementedInterfaces().InstancePerApiRequest();
            //containerBuilder.RegisterType<ResourceRepository>().As<IResourceRepository>().AsImplementedInterfaces().InstancePerApiRequest();
            //containerBuilder.RegisterType<ResourceActivityRepository>().As<IResourceActivityRepository>().InstancePerApiRequest();
            //containerBuilder.RegisterType<LocationRepository>().As<ILocationRepository>().InstancePerApiRequest();
            //containerBuilder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerApiRequest();
            //containerBuilder.RegisterType<ResourceService>().As<IResourceService>().InstancePerApiRequest();
            //containerBuilder.RegisterType<ResourceActivityService>().As<IResourceActivityService>().InstancePerApiRequest();
            //containerBuilder.RegisterType<LocationService>().As<ILocationService>().InstancePerApiRequest();
            //containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerApiRequest();
            //containerBuilder.RegisterApiControllers(System.Reflection.Assembly.GetExecutingAssembly());

            //containerBuilder.Register(c => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ResourceManagerEntities())
            //{
            //    /*Avoids UserStore invoking SaveChanges on every actions.*/
            //    //AutoSaveChanges = false
            //})).As<UserManager<ApplicationUser>>().InstancePerHttpRequest();

            var webApiContainerBuilder = new ContainerBuilder();
            //RegisterAutofacServices(webApiContainerBuilder);
            ConfigureWebApiContainer(webApiContainerBuilder);


            var mvcContainerBuilder = new ContainerBuilder();
            //RegisterAutofacServices(mvcContainerBuilder);
            ConfigureMvcContainer(mvcContainerBuilder);

            //IContainer container = containerBuilder.Build();
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            //var mvcBuilder = new ContainerBuilder();
            //mvcBuilder.RegisterControllers(Assembly.GetExecutingAssembly());
            //IContainer mvcContainer = mvcBuilder.Build(Autofac.Builder.ContainerBuildOptions.None);
            //DependencyResolver.SetResolver(new AutofacDependencyResolver(mvcContainer));
        }

        public static void RegisterAutofacServices(ContainerBuilder containerBuilder)
        {
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

            containerBuilder.Register(c => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<UserManager<ApplicationUser>>().InstancePerHttpRequest();

            containerBuilder.Register(c => new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<RoleManager<IdentityRole>>().InstancePerHttpRequest();

        }

        public static void ConfigureWebApiContainer(ContainerBuilder containerBuilder)
        {
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

            containerBuilder.Register(c => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<UserManager<ApplicationUser>>().InstancePerApiRequest();

            containerBuilder.Register(c => new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<RoleManager<IdentityRole>>().InstancePerApiRequest();
             

            containerBuilder.RegisterApiControllers(System.Reflection.Assembly.GetExecutingAssembly());
            IContainer container = containerBuilder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        public static void ConfigureMvcContainer(ContainerBuilder containerBuilder)
        {
            containerBuilder.RegisterType<DatabaseFactory>().As<IDatabaseFactory>().AsImplementedInterfaces().InstancePerHttpRequest();
            containerBuilder.RegisterType<UnitOfWork>().As<IUnitOfWork>().AsImplementedInterfaces().InstancePerHttpRequest();
            containerBuilder.RegisterType<ResourceRepository>().As<IResourceRepository>().AsImplementedInterfaces().InstancePerHttpRequest();
            containerBuilder.RegisterType<ResourceActivityRepository>().As<IResourceActivityRepository>().InstancePerHttpRequest();
            containerBuilder.RegisterType<LocationRepository>().As<ILocationRepository>().InstancePerHttpRequest();
            containerBuilder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerHttpRequest();
            containerBuilder.RegisterType<ResourceService>().As<IResourceService>().InstancePerHttpRequest();
            containerBuilder.RegisterType<ResourceActivityService>().As<IResourceActivityService>().InstancePerHttpRequest();
            containerBuilder.RegisterType<LocationService>().As<ILocationService>().InstancePerHttpRequest();
            containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerHttpRequest();

            containerBuilder.Register(c => new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<UserManager<ApplicationUser>>().InstancePerHttpRequest();

            containerBuilder.Register(c => new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ResourceManagerEntities())
            {
                /*Avoids UserStore invoking SaveChanges on every actions.*/
                //AutoSaveChanges = false
            })).As<RoleManager<IdentityRole>>().InstancePerHttpRequest();

            containerBuilder.RegisterControllers(Assembly.GetExecutingAssembly());
            IContainer mvcContainer = containerBuilder.Build(Autofac.Builder.ContainerBuildOptions.None);
            DependencyResolver.SetResolver(new AutofacDependencyResolver(mvcContainer));
        }
    }
}