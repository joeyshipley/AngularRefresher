namespace NGA.Application.Infrastructure
{
    public interface ISettingsProvider
    {
        string ApiHackerNewsTopStories();
        string ApiHackerNewsStoryDetails(int id);
    }
}