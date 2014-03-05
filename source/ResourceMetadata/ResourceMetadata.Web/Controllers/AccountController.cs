using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using ResourceMetadata.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ResourceMetadata.Web.Controllers
{
    public class AccountController : Controller
    {

        private readonly IUserService userService;

        private readonly UserManager<ApplicationUser> userManager;
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        public AccountController(IUserService userService, UserManager<ApplicationUser> userManager)
        {
            this.userService = userService;
            this.userManager = userManager;

            //Todo: This needs to be moved from here.
            this.userManager.UserValidator = new UserValidator<ApplicationUser>(userManager)
            {
                AllowOnlyAlphanumericUserNames = false
            };
        }

        [OverrideAuthentication]
        public ActionResult Login()
        {
            return View(new LoginViewModel());
        }

        [HttpPost]
        [OverrideAuthentication]
        public async Task<ActionResult> Login(LoginViewModel viewModel)
        {
            var user = await userManager.FindAsync(viewModel.Email, viewModel.Password);

            if (user == null)
            {
                return View();
            }

            await SignInAsync(user, isPersistent: false);
            return RedirectToAction("Index", "Home");
        }
        [OverrideAuthentication]
        public ActionResult Register()
        {
            return View(new RegisterViewModel());
        }

        [HttpPost]
        [OverrideAuthentication]
        public async Task<ActionResult> Register(RegisterViewModel viewModel)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    ApplicationUser user = new ApplicationUser();
                    Mapper.Map(viewModel, user);

                    var identityResult = userManager.Create(user, viewModel.Password);
                    //var userRoleResult = userManager.AddToRole(user.Id, "Member");

                    if (identityResult.Succeeded)
                    {
                        var userRoleResult = await userManager.AddToRoleAsync(user.Id, "Member");

                        if (userRoleResult.Succeeded)
                        {
                            await SignInAsync(user, isPersistent: false);
                            return RedirectToAction("Index", "Home");
                        }

                        return View();
                    }
                    else
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            //ModelState.AddModelError(error)
                        }

                        return View();
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public ActionResult LogOut(int id)
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Login");
        }


        #region Private methods
        #region SignInAsync
        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            try
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                var identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        #endregion SignInAsync
        #endregion SignInAsync
    }
}