using System.Collections.Generic;
using NGA.Application.Stories;

namespace NGA.Application.External
{
    public interface IHackerNewsApiAdapter
    {
        List<Story> RequestTopStories();
        Story RequestStory(int id);
    }
}