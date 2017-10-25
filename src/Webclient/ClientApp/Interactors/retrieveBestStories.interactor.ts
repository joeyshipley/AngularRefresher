declare var angular: any;

module Interactors {
    export class RetrieveBestStories {
        static $inject = [ "appState", "hackerNewsService" ];
        constructor(
            public appState: App.State,
            public hackerNewsService: Adapters.HackerNews
        ) {}

        public perform() {
            this.appState.setDataIsLoading();
            this.hackerNewsService.retrieveBestStories()
                .then((results) => {
                    this.appState.persistStories(results);
                });
        }
    }
}
angular.module("NGApp").service("retrieveBestStories", Interactors.RetrieveBestStories);