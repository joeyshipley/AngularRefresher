declare var angular: any;
declare var Promise: any;

module Views {
    export class ResultsController {
        static $inject = [ "$scope", "appState", "retrieveBestStories" ];
        constructor(
            public $scope: any, 
            public appState: App.State,
            public retrieveBestStories: Interactors.RetrieveBestStories
        ) {
            appState.subscribeStateChange(this, this.$scope);

            this.$scope.title = "Results View";

            this.render();
            this.retrieveBestStories.perform();
        }

        public render() {
            return new Promise((resolve, reject) => {
                this.$scope.isLoading = this.appState.isLoading;
                this.$scope.stories = this.appState.stories;
                resolve();
            });
        }
    }
}
angular.module("NGApp").controller("resultsController", Views.ResultsController);