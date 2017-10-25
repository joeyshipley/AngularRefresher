var Views;
(function (Views) {
    var SearchController = /** @class */ (function () {
        function SearchController($scope) {
            this.$scope = $scope;
            this.render();
        }
        SearchController.prototype.render = function () {
            this.$scope.title = "Search View";
        };
        SearchController.$inject = ["$scope"];
        return SearchController;
    }());
    Views.SearchController = SearchController;
})(Views || (Views = {}));
angular.module("NGApp").controller("searchController", Views.SearchController);
//# sourceMappingURL=search.controller.js.map