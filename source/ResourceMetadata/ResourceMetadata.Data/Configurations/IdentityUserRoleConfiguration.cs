using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity.ModelConfiguration;

namespace ResourceMetadata.Data.Configurations
{
    public class IdentityUserRoleConfiguration : EntityTypeConfiguration<IdentityUserRole>
    {
        public IdentityUserRoleConfiguration()
        {
            HasKey(role => new { role.RoleId, role.UserId });
            //HasRequired(role => role.User).WithMany().HasForeignKey(role => role.UserId);
        }
    }

}
