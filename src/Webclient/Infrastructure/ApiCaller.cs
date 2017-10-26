using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using NGA.Application.Infrastructure;

namespace NGA.Webclient.Infrastructure
{
    public class ApiCaller : IApiCaller
    {
        public async Task<T> Call<T>(string url, Func<string, T> parseContent)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            return await Task.Run(() => parseContent(content));
        }
    }
}