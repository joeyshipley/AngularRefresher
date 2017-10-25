var Views;
(function (Views) {
    var ResultsController = /** @class */ (function () {
        function ResultsController($scope, appState, retrieveBestStories) {
            this.$scope = $scope;
            this.appState = appState;
            this.retrieveBestStories = retrieveBestStories;
            appState.subscribeStateChange(this, this.$scope);
            this.$scope.title = "Results View";
            this.$scope.isLoading = true;
            this.$scope.stories = [];
            this.render();
            this.retrieveBestStories.perform();
        }
        ResultsController.prototype.render = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.$scope.isLoading = _this.appState.isLoading;
                _this.$scope.stories = _this.appState.stories;
                resolve();
            });
        };
        ResultsController.$inject = ["$scope", "appState", "retrieveBestStories"];
        return ResultsController;
    }());
    Views.ResultsController = ResultsController;
})(Views || (Views = {}));
angular.module("NGApp").controller("resultsController", Views.ResultsController);
//# sourceMappingURL=results.controller.js.map