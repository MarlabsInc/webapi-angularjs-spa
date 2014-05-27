using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Model
{
    public class Resource
    {
        public Resource()
        {
            this.Activities = new HashSet<ResourceActivity>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int LocationId { get; set; }
        public virtual Location Location { get; set; }

        public string Path { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsShared { get; set; }
        public virtual ICollection<ResourceActivity> Activities { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
