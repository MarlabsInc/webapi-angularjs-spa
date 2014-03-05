using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ResourceMetadata.Web.Enums;
using System.ComponentModel.DataAnnotations;

namespace ResourceMetadata.Web.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage="Required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Required")]
        public string Password { get; set; }
        public LoginActions Action { get; set; }
    }
}