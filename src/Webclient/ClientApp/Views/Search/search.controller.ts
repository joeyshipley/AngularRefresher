declare var angular: any;

module Views {
    export class SearchController {
        static $inject = [ "$scope" ];
        constructor(
            public $scope: any, 
        ) {
            this.render();
        }

        public render() {
            this.$scope.title = "Search View";
        }
    }
}
angular.module("NGApp").controller("searchController", Views.SearchController);