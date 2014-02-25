using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity.ModelConfiguration;

namespace ResourceMetadata.Data.Configurations
{
    public class IdentityUserLoginConfiguration : EntityTypeConfiguration<IdentityUserLogin>
    {
        public IdentityUserLoginConfiguration()
        {
            HasKey(login => new { login.UserId, login.LoginProvider, login.ProviderKey });
            //HasRequired(login => login.UserId).WithMany().HasForeignKey(login => login.UserId);
        }
    }
}
