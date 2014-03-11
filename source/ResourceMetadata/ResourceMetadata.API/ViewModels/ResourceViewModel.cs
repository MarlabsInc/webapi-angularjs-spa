
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace ResourceMetadata.API.ViewModels
{
    public class ResourceViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsShared { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public string Path { get; set; }
        public int Priority { get; set; }

        public IEnumerable<ResourceActivityViewModel> Activities { get; set; }

    }
}