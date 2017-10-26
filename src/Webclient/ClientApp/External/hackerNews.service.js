var SETTINGS = {
    URL: {
        BASE: 'https://hacker-news.firebaseio.com/v0',
        ROUTES: {
            BEST_STORIES: '/beststories.json',
            STORY: '/item/{:id}.json?print=pretty'
        }
    }
};
var Adapters;
(function (Adapters) {
    var HackerNews = /** @class */ (function () {
        function HackerNews($http, $q, appState) {
            this.$http = $http;
            this.$q = $q;
            this.appState = appState;
        }
        HackerNews.prototype.retrieveBestStories = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var url = SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.BEST_STORIES;
                _this.$http
                    .get(url)
                    .then(function (response) {
                    var promises = [];
                    response.data.forEach(function (id) {
                        if (!_this.appState.storyExists(id)) {
                            promises.push(_this.retrieveStoryDetails(id));
                        }
                    });
                    return _this.$q.all(promises);
                })
                    .then(function (results) {
                    resolve(results);
                });
            });
        };
        HackerNews.prototype.retrieveStoryDetails = function (id) {
            var _this = this;
            return new Promise(function (resolve) {
                var url = (SETTINGS.URL.BASE + SETTINGS.URL.ROUTES.STORY).replace("{:id}", id);
                _this.$http
                    .get(url)
                    .then(function (response) {
                    resolve(response.data);
                });
            });
        };
        HackerNews.$inject = ["$http", "$q", "appState"];
        return HackerNews;
    }());
    Adapters.HackerNews = HackerNews;
})(Adapters || (Adapters = {}));
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);
//# sourceMappingURL=hackerNews.service.js.map