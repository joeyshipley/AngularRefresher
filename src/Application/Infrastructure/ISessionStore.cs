using System.Collections.Generic;
using NGA.Application.Stories;

namespace NGA.Application.Infrastructure
{
    public interface ISessionStore
    {
        void AddStory(Story story);
        List<Story> GetStories();
        Story GetStory(int id);
        bool StoryExists(int id);
    }
}