// /v0/beststories
// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
var Adapters;
(function (Adapters) {
    var HackerNews = /** @class */ (function () {
        function HackerNews($http) {
            this.$http = $http;
        }
        HackerNews.prototype.retrieveBestStories = function () {
            return new Promise(function (resolve, reject) { resolve({ success: true }); });
        };
        HackerNews.$inject = ["$http"];
        return HackerNews;
    }());
    Adapters.HackerNews = HackerNews;
})(Adapters || (Adapters = {}));
angular.module("NGApp").service("hackerNewsService", Adapters.HackerNews);
