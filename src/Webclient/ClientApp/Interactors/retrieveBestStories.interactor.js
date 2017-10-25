var Interactors;
(function (Interactors) {
    var RetrieveBestStories = /** @class */ (function () {
        function RetrieveBestStories(appState, hackerNewsService) {
            this.appState = appState;
            this.hackerNewsService = hackerNewsService;
        }
        RetrieveBestStories.prototype.perform = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.appState.setDataIsLoading();
                _this.hackerNewsService.retrieveBestStories()
                    .then(function (results) {
                    console.log('FINISHED > RetrieveBestStories.peform');
                    _this.appState.persistStories(results);
                    resolve();
                });
            });
        };
        RetrieveBestStories.$inject = ["appState", "hackerNewsService"];
        return RetrieveBestStories;
    }());
    Interactors.RetrieveBestStories = RetrieveBestStories;
})(Interactors || (Interactors = {}));
angular.module("NGApp").service("retrieveBestStories", Interactors.RetrieveBestStories);
//# sourceMappingURL=retrieveBestStories.interactor.js.map