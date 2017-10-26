using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstituteAutoMocker;

namespace NGA.Tests.Infrastructure
{
    public class MockistTest<T>
        where T : class
    {
        protected T SystemUnderTest;
        protected NSubstituteAutoMocker<T> Mocker;

        [TestInitialize]
        public virtual void Init()
        {
            Mocker = new NSubstituteAutoMocker<T>();
            SystemUnderTest = Mocker.ClassUnderTest;

            Arrange();
            Act();
        }

        [TestCleanup]
        public virtual void TestCleanup() 
        {
            CleanUp();
        }

        public virtual void Arrange() {}
        public virtual void Act() {}
        public virtual void CleanUp() {}
    }
}