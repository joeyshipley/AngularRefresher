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

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Assets/Scripts/angular.min.js",
                "~/Assets/Scripts/angular.route.min.js",
                "~/Assets/Scripts/angular.sanitize.min.js",
                "~/Assets/Scripts/angular.ui-router.min.js",
                "~/Assets/Scripts/moment.min.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/app")
                .Include(
                    "~/ClientApp/Infrastructure/app.module.js",
                    "~/ClientApp/Infrastructure/app.config.js",
                    "~/ClientApp/Infrastructure/app.state.js"
                )
                .IncludeDirectory("~/ClientApp/External", "*.js", true)
                .IncludeDirectory("~/ClientApp/Interactors", "*.js", true)
                .IncludeDirectory("~/ClientApp/Views", "*.js", true)
            );
        }
    }
}
