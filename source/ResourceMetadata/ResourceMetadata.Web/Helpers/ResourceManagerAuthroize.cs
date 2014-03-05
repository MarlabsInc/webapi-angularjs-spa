using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ResourceMetadata.Web.Helpers
{
    public class ResourceManagerAuthroize : System.Web.Mvc.AuthorizeAttribute
    {
        private readonly string loginUrl;

        public ResourceManagerAuthroize(string loginUrl)
        {
            this.loginUrl = loginUrl;
        }


        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var currentContext = filterContext.HttpContext;

            if (currentContext != null && (currentContext.User == null || !currentContext.User.Identity.IsAuthenticated))
            {
                currentContext.Response.Redirect(this.loginUrl, true);
            }

            base.OnAuthorization(filterContext);
        }
    }

    public class InvalidUserResult : IHttpActionResult
    {
        private readonly HttpRequestMessage request;

        public InvalidUserResult(HttpRequestMessage request)
        {
            this.request = request;
        }
        public System.Threading.Tasks.Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = request.CreateResponse(HttpStatusCode.NotFound);
            response.Content = new StringContent("Please check UserName/Password");
            return System.Threading.Tasks.Task.FromResult(response);
        }
    }
}