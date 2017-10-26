using System;

namespace NGA.Application.Stories
{
    public class Story
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string By { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public DateTime Time { get; set; }
    }
}