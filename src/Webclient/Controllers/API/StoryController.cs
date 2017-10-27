using System.Web.Http;
using NGA.Application.Infrastructure;
using NGA.Application.Stories.Interactors;
using NGA.Webclient.Infrastructure;

namespace NGA.Webclient.Controllers.API
{
    [RoutePrefix("api/stories")]
    public class StoryController : ApiController
    {
        private readonly IRetrieveTopStoriesInteractor _retrieveTopStories;
        private readonly IRetrieveStoryInteractor _retrieveStory;

        public StoryController(
            IRetrieveTopStoriesInteractor retrieveTopStories,
            IRetrieveStoryInteractor retrieveStory
        )
        {
            _retrieveTopStories = retrieveTopStories;
            _retrieveStory = retrieveStory;
        }

        [Route("")]
        public IHttpActionResult Get()
        {
            var result = _retrieveTopStories.Perform();
            return JsonApiResult.Build(result);
        }

        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var result = _retrieveStory.Perform(id);
            return JsonApiResult.Build(result);
        }
    }
}
