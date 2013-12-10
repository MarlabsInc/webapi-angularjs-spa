using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using ResourceMetadata.Model;
using ResourceMetadata.Data.Configurations;


namespace ResourceMetadata.Data
{
    public class ResourceManagerEntities : DbContext
    {
        public ResourceManagerEntities()
            : base("ResourceManagerEntities")
        {

        }

        public DbSet<Resource> Resources { get; set; }
        public DbSet<ResourceActivity> Activities { get; set; }
        public DbSet<Location> Locations { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new LocationConfiguration());
            modelBuilder.Configurations.Add(new ResourceConfiguration());
            modelBuilder.Configurations.Add(new ResourceActivityConfiguration());
        }
    }

    public class ResourceManagerDbInitializer : DropCreateDatabaseIfModelChanges<ResourceManagerEntities>
    {
        protected override void Seed(ResourceManagerEntities context)
        {
            context.Users.Add(new User {  Email = "abc@yahoo.com", Password = "abc" });
            context.SaveChanges();
            //    context.Locations.Add(new Location{ ID=1, })


            //    context.Resources.Add(new Resource
            //    {
            //        Name = "Ember resource",
            //        Description = "Resources for Ember development",
            //        IsShared = true,
            //        Location = "Computer",
            //        Priority = 1,
            //        Path = @"D://DileepD/",
            //        CreatedOn = DateTime.Now
            //    });

            //    context.Resources.Add(new Resource
            //    {
            //        Name = "WebAPI",
            //        Description = "Resources for Web API development",
            //        IsShared = true,
            //        Location = "Computer",
            //        Priority = 2,
            //        Path = @"D://DileepD/",
            //        CreatedOn = DateTime.Now
            //    });
            //    context.Resources.Add(new Resource
            //    {
            //        Name = "MVC resource",
            //        Description = "Resources for MVC development",
            //        IsShared = true,
            //        Location = "Computer",
            //        Priority = 3,
            //        Path = @"D://DileepD/",
            //        CreatedOn = DateTime.Now
            //    });

            //    context.SaveChanges();
            //    base.Seed(context);
        }
    }

}
