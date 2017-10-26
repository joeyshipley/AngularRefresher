using System;
using System.Threading.Tasks;

namespace NGA.Application.Infrastructure
{
    public interface IApiCaller
    {
        Task<T> Call<T>(string url, Func<string, T> parseContent);
    }
}