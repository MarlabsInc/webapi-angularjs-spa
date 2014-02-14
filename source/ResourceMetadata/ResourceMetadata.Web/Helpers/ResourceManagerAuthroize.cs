using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace ResourceMetadata.Web.Helpers
{
    public class ResourceManagerAuthroize : AuthorizeAttribute
    {

        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var skipAuthroization = actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
              || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();

            if (skipAuthroization)
            {
                return;
            }
            base.OnAuthorization(actionContext);

            var currentContext = HttpContext.Current;

            if (currentContext != null && (currentContext.User == null || !Thread.CurrentPrincipal.Identity.IsAuthenticated))
            {
                actionContext.Response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.Unauthorized,
                    Content = new StringContent("Your session has expired. Please relogin to continue.")
                };
            }

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