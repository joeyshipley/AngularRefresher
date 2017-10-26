module Views {
    export class ResultsController {
        static $inject = [ "$scope", "appState", "retrieveBestStories" ];
        constructor(
            public $scope: any, 
            public appState: App.State,
            public retrieveBestStories: Interactors.RetrieveBestStories
        ) {
            appState.subscribeStateChange(this, this.$scope);

            this.$scope.isLoading = true;
            this.$scope.stories = [];
            this.$scope.selectedStory = null;

            this.$scope.showLoadingMessage = this.showLoadingMessage.bind(this);
            this.$scope.showList = this.showList.bind(this);
            this.$scope.showDetails = this.showDetails.bind(this);
            this.$scope.selectStory = this.selectStory.bind(this);
            this.$scope.clearSelectedStory = this.clearSelectedStory.bind(this);

            this.init().then(() => {
                 return this.render();
            });
        }

        public init(): any {
            return this.retrieveBestStories.perform();
        }

        public render() {
            return new Promise((resolve) => {
                this.$scope.isLoading = this.appState.isLoading;
                this.$scope.stories = this.appState.visibleStories;
                this.$scope.selectedStory = this.appState.selectedStory;
                resolve();
            });
        }

        public showLoadingMessage() {
            return this.$scope.isLoading;
        }

        public showList() {
            return !this.$scope.isLoading && this.$scope.selectedStory == null;
        }

        public showDetails() {
            return !this.$scope.isLoading && this.$scope.selectedStory != null;
        }

        public selectStory(id) {
            this.appState.selectStory(id);
        }

        public clearSelectedStory() {
            this.appState.clearSelectedStory();
        }
    }
}
angular.module("NGApp").controller("resultsController", Views.ResultsController);