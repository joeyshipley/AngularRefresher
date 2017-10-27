using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NGA.Application.Infrastructure;
using NGA.Application.Infrastructure.JsonConverters;
using NGA.Application.Stories;

namespace NGA.Application.External
{
    public class HackerNewsApiAdapter : IHackerNewsApiAdapter
    {
        private readonly ISettingsProvider _settingsProvider;
        private readonly ISessionStore _sessionStore;
        private readonly IApiCaller _apiCaller;

        public HackerNewsApiAdapter(
            ISettingsProvider settingsProvider,
            ISessionStore sessionStore,
            IApiCaller apiCaller
        )
        {
            _settingsProvider = settingsProvider;
            _sessionStore = sessionStore;
            _apiCaller = apiCaller;
        }

        public List<Story> RequestTopStories()
        {
            var stories = new List<Story>();
            var url = _settingsProvider.ApiHackerNewsTopStories();
            var storyIds = retrieveTopStoryIdsFromApi(url).Result;
            storyIds.ForEach((id) =>
            {
                stories.Add(getStoryThrotted(id));
            });
            return stories;
        }

        public Story RequestStory(int id)
        {
            return getStory(id);
        }

        private Story getStory(int id)
        {
            if (_sessionStore.StoryExists(id))
            {
                return _sessionStore.GetStory(id);
            }
            var story = retrieveStoryFromApi(id).Result;
            _sessionStore.AddStory(story);
            return story;
        }
        
        private Story getStoryThrotted(int id)
        {
            if (_sessionStore.StoryExists(id)) { return getStory(id); }
            
            var story = getStory(id);
            System.Threading.Thread.Sleep(1000);
            return story;
        }

        private Task<Story> retrieveStoryFromApi(int id)
        {
            var url = _settingsProvider.ApiHackerNewsStoryDetails(id);
            return _apiCaller.Call(url, parseStoryFrom);
        }

        private Task<List<int>> retrieveTopStoryIdsFromApi(string url)
        {
            return _apiCaller.Call(url, parseIdsFrom);
        }

        private List<int> parseIdsFrom(string content)
        {
            return JsonConvert.DeserializeObject<List<int>>(content);
        }

        private Story parseStoryFrom(string content)
        {
            var dateTimeConverter = new DateTimeJsonConverter();
            return JsonConvert.DeserializeObject<Story>(content, dateTimeConverter);
        }
    }
}