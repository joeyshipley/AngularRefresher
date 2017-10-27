const SETTINGS: any = {
    URL: {
        BASE: '/',
        ROUTES: {
            BEST_STORIES: 'api/stories/',
            STORY: 'api/stories/{:id}'
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
                        const stories = response.data.Stories.map((s) => { return this.mapStory(s); });
                        resolve(stories);
                    });
            });
        }

        public retrieveStoryDetails(id) {
            return new Promise((resolve) => {
                const url = (SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.STORY).replace("{:id}", id);
                this.$http
                    .get(url)
                    .then((response) => {
                        resolve(this.mapStory(response.data.Story));
                    });
            });
        }

        private mapStory(data) {
            return {
                id: data.Id,
                by: data.By,
                title: data.Title,
                text: data.Text,
                url: data.Url,
                time: moment(data.time).format("MM/DD/YYYY")
            };
        }
    }
}
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);