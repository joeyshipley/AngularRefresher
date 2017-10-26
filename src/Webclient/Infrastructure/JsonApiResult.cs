using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace NGA.Webclient.Infrastructure
{
    public class JsonApiResult : IHttpActionResult
    {
        private readonly string _jsonString;

        private JsonApiResult(string jsonString)
        {
            _jsonString = jsonString;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var content = new StringContent(_jsonString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = new HttpResponseMessage(HttpStatusCode.OK) { Content = content };
            return Task.FromResult(response);
        }

        public static JsonApiResult Build(object model)
        {
            var jsonString = new JavaScriptSerializer().Serialize(model);
            return new JsonApiResult(jsonString);
        }

        public static JsonApiResult Build(string jsonString)
        {
            return new JsonApiResult(jsonString);
        }
    }
}