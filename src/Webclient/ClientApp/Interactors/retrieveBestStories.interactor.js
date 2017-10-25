var Interactors;
(function (Interactors) {
    var RetrieveBestStories = /** @class */ (function () {
        function RetrieveBestStories(appState, hackerNewsService) {
            this.appState = appState;
            this.hackerNewsService = hackerNewsService;
        }
        RetrieveBestStories.prototype.perform = function () {
            var _this = this;
            this.appState.setDataIsLoading();
            this.hackerNewsService.retrieveBestStories()
                .then(function (results) {
                _this.appState.persistStories(results);
            });
        };
        RetrieveBestStories.$inject = ["appState", "hackerNewsService"];
        return RetrieveBestStories;
    }());
    Interactors.RetrieveBestStories = RetrieveBestStories;
})(Interactors || (Interactors = {}));
angular.module("NGApp").service("retrieveBestStories", Interactors.RetrieveBestStories);
