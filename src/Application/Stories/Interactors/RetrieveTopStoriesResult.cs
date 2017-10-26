using System.Collections.Generic;

namespace NGA.Application.Stories.Interactors
{
    public class RetrieveTopStoriesResult
    {
        public RetrieveTopStoriesResult()
        {
            Stories = new List<Story>();
        }

        public List<Story> Stories { get; set; }
    }
}