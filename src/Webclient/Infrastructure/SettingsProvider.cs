using System.Configuration;
using NGA.Application.Infrastructure;

namespace NGA.Webclient.Infrastructure
{
    public class SettingsProvider : ISettingsProvider
    {
        public string ApiHackerNewsTopStories()
        {
            var baseUrl = ConfigurationManager.AppSettings.Get("ApiHackerNewsBase");
            var route = ConfigurationManager.AppSettings.Get("ApiHackerNewsRouteTopStories");
            return $"{ baseUrl }{ route }";
        }

        public string ApiHackerNewsStoryDetails(int id)
        {
            var baseUrl = ConfigurationManager.AppSettings.Get("ApiHackerNewsBase");
            var route = ConfigurationManager.AppSettings.Get("ApiHackerNewsRouteStoryDetails");
            route = route.Replace("{:id}", id.ToString());
            return $"{ baseUrl }{ route }";
        }

        public int ApiHackerNewsMaxStoryRequests()
        {
            var stringSetting = ConfigurationManager.AppSettings.Get("ApiHackerNewsMaxStoryRequests");
            var maxStoryRequests = !string.IsNullOrEmpty(stringSetting) ? int.Parse(stringSetting) : 20;
            return maxStoryRequests;
        }
    }
}