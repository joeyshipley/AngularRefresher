using NGA.Application.External;

namespace NGA.Application.Stories.Interactors
{
    public class RetrieveTopStoriesInteractor : IRetrieveTopStoriesInteractor
    {
        private readonly IHackerNewsApiAdapter _hackerNewsApiAdapter;

        public RetrieveTopStoriesInteractor(IHackerNewsApiAdapter hackerNewsApiAdapter)
        {
            _hackerNewsApiAdapter = hackerNewsApiAdapter;
        }

        public RetrieveTopStoriesResult Perform()
        {
            var stories = _hackerNewsApiAdapter.RequestTopStories();
            return new RetrieveTopStoriesResult
            {
                Stories = stories
            };
        }
    }
}