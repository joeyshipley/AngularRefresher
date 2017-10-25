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
            this.$scope.isLoading = true;
            this.$scope.stories = [];

            this.init().then(() => {
                 return this.render();
            });
        }

        public init(): any {
            return this.retrieveBestStories.perform();
        }

        public test() {
            return new Promise((resolve) => {
                this.$scope.isLoading = false;
                resolve();
            });
        }

        public render() {
            return new Promise((resolve, reject) => {
                this.$scope.isLoading = this.appState.isLoading;
                this.$scope.stories = this.appState.stories;
                resolve({});
            });
        }
    }
}
angular.module("NGApp").controller("resultsController", Views.ResultsController);