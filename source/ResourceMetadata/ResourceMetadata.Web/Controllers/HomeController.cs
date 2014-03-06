using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ResourceMetadata.Web.Helpers;
using System.Web.Mvc.Filters;
using ResourceMetadata.Service;
using Microsoft.AspNet.Identity;
using ResourceMetadata.Model;
using System.Threading.Tasks;
using Microsoft.Owin.Security;
using ResourceMetadata.Web.ViewModels;
using AutoMapper;

namespace ResourceMetadata.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        public HomeController(IUserService userService, UserManager<ApplicationUser> userManager)
        { 
            this.userManager = userManager;
            //Todo: This needs to be moved from here.
            this.userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
            {
                AllowOnlyAlphanumericUserNames = false
            };
        }

        [ResourceManagerAuthroize("Home/Login")]
        //[Authorize]
        public ActionResult Index()
        {            
            return View();
        }

        [OverrideAuthorization]
        public ActionResult Login()
        {
            return View();
        }

        [OverrideAuthorization]
        public ActionResult Register()
        {
            return View();
        }


        private UserProfileViewModel GetUserProfile()
        {
            var userName = User.Identity.GetUserName();
            var user = userManager.FindByName(userName);

            if (user != null)
            {
                string userRole = "Member";

                if (user.Roles != null && user.Roles.Count > 0)
                {
                    userRole = user.Roles.First().Role.Name;
                }

                var userProfile = new UserProfileViewModel
                {
                    Email = user.Email,
                    Role = userRole
                };

                return userProfile;
            }

            throw new UnauthorizedAccessException();
        }


        
    }
}