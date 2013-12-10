using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;
using ResourceMetadata.Model;

namespace ResourceMetadata.Data.Configurations
{
    internal class ResourceActivityConfiguration : EntityTypeConfiguration<ResourceActivity>
    {
        public ResourceActivityConfiguration()
        {
            HasRequired(a => a.Resource).WithMany(r => r.Activities).HasForeignKey(a => a.ResourceId).WillCascadeOnDelete(true);
        }
    }
}
