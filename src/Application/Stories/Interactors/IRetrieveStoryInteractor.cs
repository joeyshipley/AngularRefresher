namespace NGA.Application.Stories.Interactors
{
    public interface IRetrieveStoryInteractor
    {
        RetrieveStoryResult Perform(int id);
    }
}