using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ResourceMetadata.Model;
using ResourceMetadata.Data.Configurations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;

namespace ResourceMetadata.Data
{
    public class ResourceManagerEntities : IdentityDbContext<ApplicationUser>
    {
        public ResourceManagerEntities()
            : base("ResourceManagerEntities")
        {

        }

        public DbSet<Resource> Resources { get; set; }
        public DbSet<ResourceActivity> Activities { get; set; }
        public DbSet<Location> Locations { get; set; }

        //public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new LocationConfiguration());
            modelBuilder.Configurations.Add(new ResourceConfiguration());
            modelBuilder.Configurations.Add(new ResourceActivityConfiguration());

            //Configurations Auto generated tables for IdentityDbContext.
            modelBuilder.Configurations.Add(new IdentityUserRoleConfiguration());
            modelBuilder.Configurations.Add(new IdentityUserLoginConfiguration());
        }
    }

    public class ResourceManagerDbInitializer : DropCreateDatabaseIfModelChanges<ResourceManagerEntities>
    {
        protected override void Seed(ResourceManagerEntities context)
        {
            //context.Users.Add(new ApplicationUser { Email = "abc@yahoo.com", Password = "Marlabs" });
            //context.SaveChanges();           
        }
    }

}
