using System.Web.Http;
using NGA.Webclient.Infrastructure;

namespace NGA.Webclient.Controllers.API
{
    [RoutePrefix("api/stories")]
    public class StoryController : ApiController
    {
        private readonly IExample _example;

        public StoryController(IExample example)
        {
            _example = example;
        }

        [Route("")]
        public IHttpActionResult Get()
        {

            return JsonApiResult.Build(new [] {  "1", "2"  });
        }

        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            return JsonApiResult.Build(_example.Message());
        }
    }
}
