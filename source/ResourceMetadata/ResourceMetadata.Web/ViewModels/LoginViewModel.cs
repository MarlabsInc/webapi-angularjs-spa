using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ResourceMetadata.Web.Enums;

namespace ResourceMetadata.Web.ViewModels
{
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public LoginActions Action { get; set; }
    }
}