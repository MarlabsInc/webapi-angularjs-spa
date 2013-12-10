using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceMetadata.Model
{
    public class ResourceActivity
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public int ResourceId { get; set; }
        public virtual Resource Resource { get; set; }
        public string Notes { get; set; }
        public DateTime ActivityDate { get; set; }
    }
}
