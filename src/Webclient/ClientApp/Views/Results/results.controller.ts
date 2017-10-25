declare var angular: any;

module Views {
    export class ResultsController {
        static $inject = [ "$scope" ];
        constructor(
            public $scope: any, 
        ) {
            this.render();
        }

        public render() {
            this.$scope.title = "Results View";
        }
    }
}
angular.module("NGApp").controller("resultsController", Views.ResultsController);