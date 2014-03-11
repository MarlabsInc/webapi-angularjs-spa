using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ResourceMetadata.API.Enums;
using System.ComponentModel.DataAnnotations;

namespace ResourceMetadata.API.ViewModels
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