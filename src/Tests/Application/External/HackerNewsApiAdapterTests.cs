using System;
using System.Collections.Generic;
using System.Linq;
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

    [TestClass]
    public class When_requesting_the_best_stories_that_was_not_in_session_storage
        : MockistTest<HackerNewsApiAdapter>
    {
        private IHackerNewsApiAdapter _adapter;
        private List<Story> _result;

        public override void Arrange()
        {
            _adapter = SystemUnderTest;

            Mocker.Get<IApiCaller>()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, List<int>>>())
                .Returns(new List<int> { 1, 2 });

            Mocker.Get<IApiCaller>()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>())
                .Returns(new Story
                {
                    Id = 1,
                    Title = "Test Story 2"
                }, new Story
                {
                    Id = 2,
                    Title = "Test Story 2"
                });
        }

        public override void Act()
        {
            _result = _adapter.RequestTopStories();
        }
        
        [TestMethod]
        public void It_calls_the_external_api_for_the_story_ids()
        {
            Mocker.Get<IApiCaller>()
                .Received()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, List<int>>>());
        }

        [TestMethod]
        public void It_checks_to_see_if_the_stories_were_in_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received()
                .StoryExists(1);
            Mocker.Get<ISessionStore>()
                .Received()
                .StoryExists(2);
        }

        [TestMethod]
        public void It_requests_the_story_via_the_api()
        {
            Mocker.Get<IApiCaller>()
                .Received(2)
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>());
        }

        [TestMethod]
        public void It_stores_the_fetched_stories_into_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received(2)
                .AddStory(Arg.Any<Story>());
        }

        [TestMethod]
        public void It_returns_the_collection_of_stories()
        {
            _result.Count.Should().Be(2);
        }

        [TestMethod]
        public void It_returns_the_correct_stories()
        {
            _result.First().Id.Should().Be(1);
            _result.Last().Id.Should().Be(2);
        }
    }

    [TestClass]
    public class When_requesting_the_best_stories_that_was_is_already_in_session_storage
        : MockistTest<HackerNewsApiAdapter>
    {
        private IHackerNewsApiAdapter _adapter;
        private List<Story> _result;

        public override void Arrange()
        {
            _adapter = SystemUnderTest;

            Mocker.Get<IApiCaller>()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, List<int>>>())
                .Returns(new List<int> { 1, 2 });

            Mocker.Get<ISessionStore>()
                .StoryExists(1)
                .Returns(true);

            Mocker.Get<ISessionStore>()
                .StoryExists(2)
                .Returns(true);

            Mocker.Get<ISessionStore>()
                .GetStory(1)
                .Returns(new Story
                {
                    Id = 1,
                    Title = "Test Story 1"
                });

            Mocker.Get<ISessionStore>()
                .GetStory(2)
                .Returns(new Story
                {
                    Id = 2,
                    Title = "Test Story 2"
                });
        }

        public override void Act()
        {
            _result = _adapter.RequestTopStories();
        }

        [TestMethod]
        public void It_calls_the_external_api_for_the_story_ids()
        {
            Mocker.Get<IApiCaller>()
                .Received()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, List<int>>>());
        }

        [TestMethod]
        public void It_checks_to_see_if_the_story_is_in_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received(4)
                .StoryExists(Arg.Any<int>());
        }

        [TestMethod]
        public void It_pulls_the_story_from_sesssion_storage()
        {
            Mocker.Get<ISessionStore>()
                .Received(2)
                .GetStory(Arg.Any<int>());
        }

        [TestMethod]
        public void It_does_not_call_the_external_api_for_the_story()
        {
            Mocker.Get<IApiCaller>()
                .DidNotReceive()
                .Call(Arg.Any<string>(), Arg.Any<Func<string, Story>>());
        }

        [TestMethod]
        public void It_returns_the_stories()
        {
            _result.Count.Should().Be(2);
        }
    }
}