var Views;
(function (Views) {
    var ResultsController = /** @class */ (function () {
        function ResultsController($scope) {
            this.$scope = $scope;
            this.render();
        }
        ResultsController.prototype.render = function () {
            this.$scope.title = "Results View";
        };
        ResultsController.$inject = ["$scope"];
        return ResultsController;
    }());
    Views.ResultsController = ResultsController;
})(Views || (Views = {}));
angular.module("NGApp").controller("resultsController", Views.ResultsController);
//# sourceMappingURL=results.controller.js.map