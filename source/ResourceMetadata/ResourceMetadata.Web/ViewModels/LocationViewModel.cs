using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ResourceMetadata.Web.ViewModels
{
    public class LocationViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UserId { get; set; }
    }
}