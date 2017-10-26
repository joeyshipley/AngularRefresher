const SETTINGS: any = {
    URL: {
        BASE: 'https://hacker-news.firebaseio.com/v0',
        ROUTES: {
            BEST_STORIES: '/beststories.json',
            STORY: '/item/{:id}.json?print=pretty'
        }
    }
}

module Adapters {
    export class HackerNews {
        static $inject = [ "$http", "$q", "appState" ];
        constructor(
            public $http: any,
            public $q: any,
            public appState: App.State
        ) {}

        public retrieveBestStories() {
            return new Promise((resolve) => {
                const url = SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.BEST_STORIES;
                this.$http
                    .get(url)
                    .then((response) => {
                        var promises = [];
                        response.data.forEach((id) => {
                            if (!this.appState.storyExists(id)) {
                                promises.push(this.retrieveStoryDetails(id));
                            }
                        });
                        return this.$q.all(promises);
                    })
                    .then((results) => {
                        resolve(results);
                    });
            });
        }

        public retrieveStoryDetails(id) {
            return new Promise((resolve) => {
                const url = (SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.STORY).replace("{:id}", id);
                this.$http
                    .get(url)
                    .then((response) => {
                        resolve(response.data);
                    });
            });
        }
    }
}
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);