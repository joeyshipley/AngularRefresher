var Views;
(function (Views) {
    var ResultsController = /** @class */ (function () {
        function ResultsController($scope, appState, retrieveBestStories) {
            var _this = this;
            this.$scope = $scope;
            this.appState = appState;
            this.retrieveBestStories = retrieveBestStories;
            appState.subscribeStateChange(this, this.$scope);
            this.$scope.title = "Results View";
            this.$scope.isLoading = true;
            this.$scope.stories = [];
            this.$scope.selectedStory = null;
            this.$scope.showLoadingMessage = this.showLoadingMessage.bind(this);
            this.$scope.showList = this.showList.bind(this);
            this.$scope.showDetails = this.showDetails.bind(this);
            this.$scope.selectStory = this.selectStory.bind(this);
            this.$scope.clearSelectedStory = this.clearSelectedStory.bind(this);
            this.init().then(function () {
                return _this.render();
            });
        }
        ResultsController.prototype.init = function () {
            return this.retrieveBestStories.perform();
        };
        ResultsController.prototype.render = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.$scope.isLoading = _this.appState.isLoading;
                _this.$scope.stories = _this.appState.stories;
                _this.$scope.selectedStory = _this.appState.selectedStory;
                resolve();
            });
        };
        ResultsController.prototype.showLoadingMessage = function () {
            return this.$scope.isLoading;
        };
        ResultsController.prototype.showList = function () {
            return !this.$scope.isLoading && this.$scope.selectedStory == null;
        };
        ResultsController.prototype.showDetails = function () {
            return !this.$scope.isLoading && this.$scope.selectedStory != null;
        };
        ResultsController.prototype.selectStory = function (id) {
            this.appState.selectStory(id);
        };
        ResultsController.prototype.clearSelectedStory = function () {
            this.appState.clearSelectedStory();
        };
        ResultsController.$inject = ["$scope", "appState", "retrieveBestStories"];
        return ResultsController;
    }());
    Views.ResultsController = ResultsController;
})(Views || (Views = {}));
angular.module("NGApp").controller("resultsController", Views.ResultsController);
