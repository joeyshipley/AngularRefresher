module Views {
    export class SearchController {
        static $inject = [ "$scope", "appState", "filterStoryList" ];
        constructor(
            public $scope: any,
            public appState: App.State,
            public filterStoryList: Interactors.FilterStoryList
        ) {
            appState.subscribeStateChange(this, this.$scope);

            this.$scope.filterText = "";
            this.$scope.showFilterControl = this.showFilterControl.bind(this);
            this.$scope.clearFilter = this.clearFilter.bind(this);
            this.$scope.filterList = this.filterList.bind(this);

            this.render();
        }

        public render() {
            return new Promise((resolve) => {
                this.$scope.isLoading = this.appState.isLoading;
                this.$scope.isListView = this.appState.selectedStory == null;
                resolve();
            });
        }

        public clearFilter() {
            this.$scope.filterText = "";
            this.appState.clearListFilter();
        }

        public filterList() {
            this.filterStoryList.perform(this.$scope.filterText);
        }

        public showFilterControl() {
            return !this.$scope.isLoading && this.$scope.isListView;
        }
    }
}
angular.module("NGApp").controller("searchController", Views.SearchController);