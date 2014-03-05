using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace ResourceMetadata.Web.Helpers
{
    public class ResourceManagerAuthenticationAttribute : ActionFilterAttribute ,IAuthenticationFilter
    {
        private readonly string loginUrl;

        public ResourceManagerAuthenticationAttribute(string loginUrl)
        {
            this.loginUrl = loginUrl;
        }
        public void OnAuthentication(AuthenticationContext filterContext)
        {
            var user = filterContext.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                filterContext.Result = new RedirectResult(loginUrl);
            }

        }

        public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
        {
            //var user = filterContext.HttpContext.User;

            //if (!user.Identity.IsAuthenticated)
            //{
            //    filterContext.Result = new RedirectResult(loginUrl);
            //}
        }
    }
}