using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NGA.Webclient.Infrastructure
{
    public interface IExample
    {
        string Message();
    }

    public class Example : IExample
    {
        public string Message()
        {
            return "RAWR";
        }
    }
}