using System.Web.Optimization;

namespace NGA.Webclient
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/styles").Include(
                "~/Assets/Content/main.min.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Assets/Scripts/modernizr-*"
            ));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                "~/Assets/Scripts/temp.js"
            ));
        }
    }
}
