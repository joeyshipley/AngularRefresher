using System;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NGA.Application.External;
using NGA.Application.Infrastructure;
using NGA.Application.Stories;
using NGA.Tests.Infrastructure;
using NSubstitute;

namespace NGA.Tests.Application.External.HackerNewsApiAdapterTests
{
    [TestClass]
    public class When_requesting_a_story_that_was_not_in_session_storage
        : MockistTest<HackerNewsApiAdapter>
    {
        private IHackerNewsApiAdapter _adapter;
        private Story _result;

        public override void Arrange()
        {
            _adapter = SystemUnderTest;

            Mocker.Get<IApiCaller>()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>())
                .Returns(new Story
                {
                    Id = 1,
                    Title = "Test Story"
                });
        }

        public override void Act()
        {
            _result = _adapter.RequestStory(1);
        }

        [TestMethod]
        public void It_checks_to_see_if_the_story_is_in_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received()
                .StoryExists(1);
        }

        [TestMethod]
        public void It_requests_the_story_via_the_api()
        {
            Mocker.Get<IApiCaller>()
                .Received()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>());
        }

        [TestMethod]
        public void It_stores_the_fetched_story_into_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received()
                .AddStory(Arg.Any<Story>());
        }

        [TestMethod]
        public void It_returns_the_story()
        {
            _result.Id.Should().Be(1);
        }
    }

    [TestClass]
    public class When_requesting_a_story_that_was_is_already_in_session_storage
        : MockistTest<HackerNewsApiAdapter>
    {
        private IHackerNewsApiAdapter _adapter;
        private Story _result;

        public override void Arrange()
        {
            _adapter = SystemUnderTest;

            Mocker.Get<ISessionStore>()
                .StoryExists(1)
                .Returns(true);

            Mocker.Get<ISessionStore>()
                .GetStory(1)
                .Returns(new Story
                {
                    Id = 1,
                    Title = "Test Story"
                });
        }

        public override void Act()
        {
            _result = _adapter.RequestStory(1);
        }

        [TestMethod]
        public void It_checks_to_see_if_the_story_is_in_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received()
                .StoryExists(1);
        }

        [TestMethod]
        public void It_pulls_the_story_from_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received()
                .GetStory(1);
        }

        [TestMethod]
        public void It_does_not_call_the_external_api_for_the_story()
        {
            Mocker.Get<IApiCaller>()
                .DidNotReceive()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>());
        }

        [TestMethod]
        public void It_returns_the_story()
        {
            _result.Id.Should().Be(1);
        }
    }
}