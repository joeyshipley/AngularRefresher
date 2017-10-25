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
        static $inject = [ "$http", "$q" ];
        constructor(
            public $http: any,
            public $q: any
        ) {}

        public retrieveBestStories() {
            return new Promise((resolve, reject) => {
                const url = SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.BEST_STORIES;
                this.$http
                    .get(url)
                    .then((response) => {
                        var promises = [];
                        response.data.forEach((id) => {
                            promises.push(this.retrieveStoryDetails(id));
                        });
                        return this.$q.all(promises);
                    })
                    .then((results) => {
                        console.log('FINISHED > HackerNews.retrieveBestStories');
                        resolve(results);
                    });
            });
        }

        public retrieveStoryDetails(id) {
            return new Promise((resolve, reject) => {
                const url = (SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.STORY).replace("{:id}", id);
                this.$http
                    .get(url)
                    .then((response) => {
                        console.log('FINISHED > HackerNews.retrieveStoryDetails');
                        resolve(response.data);
                    });
            });
        }
    }
}
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);