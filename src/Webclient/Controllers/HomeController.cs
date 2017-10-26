using System.Web.Mvc;

namespace NGA.Webclient.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}