var Views;
(function (Views) {
    var SearchController = /** @class */ (function () {
        function SearchController($scope, appState, filterStoryList) {
            this.$scope = $scope;
            this.appState = appState;
            this.filterStoryList = filterStoryList;
            appState.subscribeStateChange(this, this.$scope);
            this.$scope.filterText = "";
            this.$scope.showFilterControl = this.showFilterControl.bind(this);
            this.$scope.clearFilter = this.clearFilter.bind(this);
            this.$scope.filterList = this.filterList.bind(this);
            this.render();
        }
        SearchController.prototype.render = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.$scope.isLoading = _this.appState.isLoading;
                _this.$scope.isListView = _this.appState.selectedStory == null;
                resolve();
            });
        };
        SearchController.prototype.clearFilter = function () {
            this.$scope.filterText = "";
            this.appState.clearListFilter();
        };
        SearchController.prototype.filterList = function () {
            this.filterStoryList.perform(this.$scope.filterText);
        };
        SearchController.prototype.showFilterControl = function () {
            return !this.$scope.isLoading && this.$scope.isListView;
        };
        SearchController.$inject = ["$scope", "appState", "filterStoryList"];
        return SearchController;
    }());
    Views.SearchController = SearchController;
})(Views || (Views = {}));
angular.module("NGApp").controller("searchController", Views.SearchController);
//# sourceMappingURL=search.controller.js.map