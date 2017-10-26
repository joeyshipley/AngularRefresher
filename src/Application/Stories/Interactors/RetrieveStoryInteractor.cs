using NGA.Application.External;

namespace NGA.Application.Stories.Interactors
{
    public class RetrieveStoryInteractor : IRetrieveStoryInteractor
    {
        private readonly IHackerNewsApiAdapter _hackerNewsApiAdapter;

        public RetrieveStoryInteractor(IHackerNewsApiAdapter hackerNewsApiAdapter)
        {
            _hackerNewsApiAdapter = hackerNewsApiAdapter;
        }

        public RetrieveStoryResult Perform(int id)
        {
            var story = _hackerNewsApiAdapter.RequestStory(id);
            return new RetrieveStoryResult
            {
                Story = story
            };
        }
    }
}