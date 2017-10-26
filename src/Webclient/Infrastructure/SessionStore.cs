using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using NGA.Application.Infrastructure;
using NGA.Application.Stories;

namespace NGA.Webclient.Infrastructure
{
    public class SessionStore : ISessionStore
    {
        private const string KEY_STORIES = "KEY::STORIES";

        public SessionStore()
        {
            Session[KEY_STORIES] = Session[KEY_STORIES] ?? new List<Story>();
        }
        
        public void AddStory(Story story)
        {
            var stories = GetStories();
            if (StoryExists(story.Id)) 
            {
                var existingStory = GetStory(story.Id);
                stories.Remove(existingStory);
            }
            stories.Add(story);
            Session[KEY_STORIES] = stories;
        }

        public Story GetStory(int id)
        {
            return GetStories().FirstOrDefault(s => s.Id == id);
        }

        public List<Story> GetStories()
        {
            return Session[KEY_STORIES] as List<Story>;
        }

        public bool StoryExists(int id)
        {
            return GetStory(id) != null;
        }

        protected HttpSessionState Session => HttpContext.Current.Session;
    }
}