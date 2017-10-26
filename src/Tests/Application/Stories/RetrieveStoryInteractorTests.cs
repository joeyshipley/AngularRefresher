using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NGA.Application.External;
using NGA.Application.Stories;
using NGA.Application.Stories.Interactors;
using NGA.Tests.Infrastructure;
using NSubstitute;

namespace NGA.Tests.Application.Stories.RetrieveStoryInteractorTests
{
    [TestClass]
    public class When_retrieving_a_story
        : MockistTest<RetrieveStoryInteractor>
    {
        private IRetrieveStoryInteractor _interactor;
        private RetrieveStoryResult _result;

        public override void Arrange()
        {
            _interactor = SystemUnderTest;
            Mocker.Get<IHackerNewsApiAdapter>()
                .RequestStory(1)
                .Returns(new Story
                {
                    Id = 1,
                    Title = "Test Story"
                });
        }

        public override void Act()
        {
            _result = _interactor.Perform(1);
        }

        [TestMethod]
        public void It_gets_the_story_from_the_hacker_news_api()
        {
            Mocker.Get<IHackerNewsApiAdapter>()
                .Received()
                .RequestStory(1);
        }

        [TestMethod]
        public void It_returns_the_story()
        {
            _result.Story.Id.Should().Be(1);
            _result.Story.Title.Should().Be("Test Story");
        }
    }
}