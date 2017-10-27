var SETTINGS = {
    URL: {
        BASE: '/',
        ROUTES: {
            BEST_STORIES: 'api/stories/',
            STORY: 'api/stories/{:id}'
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
                    var stories = response.data.Stories.map(function (s) { return _this.mapStory(s); });
                    resolve(stories);
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
                    resolve(_this.mapStory(response.data.Story));
                });
            });
        };
        HackerNews.prototype.mapStory = function (data) {
            return {
                id: data.Id,
                by: data.By,
                title: data.Title,
                text: data.Text,
                url: data.Url,
                time: moment(data.time).format("MM/DD/YYYY")
            };
        };
        HackerNews.$inject = ["$http", "$q", "appState"];
        return HackerNews;
    }());
    Adapters.HackerNews = HackerNews;
})(Adapters || (Adapters = {}));
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);
//# sourceMappingURL=hackerNews.service.js.map