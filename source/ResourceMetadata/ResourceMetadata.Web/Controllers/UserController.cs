using AutoMapper;
using Newtonsoft.Json;
using ResourceMetadata.Model;
using ResourceMetadata.Service;
using ResourceMetadata.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace ResourceMetadata.Web.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        [AllowAnonymous]
        public IHttpActionResult Get()
        {
            if (System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated)
            {
                return Ok();
            }

            return Unauthorized();
        }



        [AllowAnonymous]
        [HttpPut]
        public IHttpActionResult LogOut()
        {
            if (HttpContext.Current != null && HttpContext.Current.Session != null)
            {
                HttpContext.Current.Session.Abandon();
            }
            var userCookie = new HttpCookie(FormsAuthentication.FormsCookieName);
            userCookie.Expires = DateTime.Now.AddYears(-1);
            HttpContext.Current.Response.Cookies.Add(userCookie);
            FormsAuthentication.SignOut();

            return Ok();
        }

        [AllowAnonymous]
        public IHttpActionResult Post(RegisterViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                switch (viewModel.Action)
                {
                    case Enums.LoginActions.Login:
                        {
                            var user = userService.GetUserByEmailAndPassword(viewModel.Email, viewModel.Password);

                            if (user == null)
                            {
                                return new ResourceMetadata.Web.Helpers.InvalidUserResult(Request);
                            }

                            var ticket = new FormsAuthenticationTicket(viewModel.Email, true, 30);
                            var jsonString = JsonConvert.SerializeObject(ticket);
                            HttpContext.Current.Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(ticket)));
                            return Ok();
                        }
                    case Enums.LoginActions.Register:
                        {
                            User user = new User();
                            Mapper.Map(viewModel, user);

                            userService.RegisterUser(user);
                            var ticket = new FormsAuthenticationTicket(viewModel.Email, true, 3);
                            var jsonString = JsonConvert.SerializeObject(ticket);
                            HttpContext.Current.Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(ticket)));
                            return Ok();
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            return InternalServerError();
        }
    }
}