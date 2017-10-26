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
                    if (this.matchByTitle(s) || this.matchByAuthor(s)) {
                        visibleStories.push(s);
                    }
                });
                this.appState.visibleStories = visibleStories;
                this.appState.notifyStateChange();

                resolve();
            });
        }

        private matchByTitle(story) {
            return story.title.toLowerCase().indexOf(this.appState.listFilter) >= 0;
        }

        private matchByAuthor(story) {
            return story.by.toLowerCase().indexOf(this.appState.listFilter) >= 0;            
        }
    }
}
angular.module("NGApp").service("filterStoryList", Interactors.FilterStoryList);