using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NGA.Application.External;
using NGA.Application.Stories;
using NGA.Application.Stories.Interactors;
using NGA.Tests.Infrastructure;
using NSubstitute;

namespace NGA.Tests.Application.Stories.RetrieveTopStoriesInteractorTests
{
    [TestClass]
    public class When_retrieving_the_top_stories
        : MockistTest<RetrieveTopStoriesInteractor>
    {
        private IRetrieveTopStoriesInteractor _interactor;
        private RetrieveTopStoriesResult _result;

        public override void Arrange()
        {
            _interactor = SystemUnderTest;
            Mocker.Get<IHackerNewsApiAdapter>()
                .RequestTopStories()
                .Returns(new List<Story>
                {
                    new Story { Id = 1, Title = "Test Story" }
                });
        }

        public override void Act()
        {
            _result = _interactor.Perform();
        }

        [TestMethod]
        public void It_gets_the_stories_from_the_hacker_news_api()
        {
            Mocker.Get<IHackerNewsApiAdapter>()
                .Received()
                .RequestTopStories();
        }
        
        [TestMethod]
        public void It_returns_the_collection_of_stories()
        {
            _result.Stories.Count.Should().Be(1);
        }

        [TestMethod]
        public void It_populates_the_collection_of_stories_correctly()
        {
            var story = _result.Stories.FirstOrDefault();
            story.Id.Should().Be(1);
            story.Title.Should().Be("Test Story");
        }
    }
}