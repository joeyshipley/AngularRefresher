declare var angular: any;

module Interactors {
    export class FilterStoryList {
        static $inject = [ "appState" ];
        constructor(
            public appState: App.State
        ) {}

        public perform(filterText) {
            return new Promise((resolve) => {
                filterText = filterText || "";
                this.appState.listFilter = filterText.toLowerCase();

                if (!this.appState.listFilter || this.appState.listFilter.length == 0) {
                    this.appState.clearListFilter();
                    return;
                }

                var visibleStories = [];
                this.appState.stories.forEach((s) => {
                    if (s.title.toLowerCase().indexOf(this.appState.listFilter) >= 0) {
                        visibleStories.push(s);
                    }
                });
                this.appState.visibleStories = visibleStories;
                this.appState.notifyStateChange();

                resolve();
            });
        }
    }
}
angular.module("NGApp").service("filterStoryList", Interactors.FilterStoryList);