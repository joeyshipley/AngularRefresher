var Interactors;
(function (Interactors) {
    var FilterStoryList = /** @class */ (function () {
        function FilterStoryList(appState) {
            this.appState = appState;
        }
        FilterStoryList.prototype.perform = function (filterText) {
            var _this = this;
            return new Promise(function (resolve) {
                filterText = filterText || "";
                _this.appState.listFilter = filterText.toLowerCase();
                if (!_this.appState.listFilter || _this.appState.listFilter.length == 0) {
                    _this.appState.clearListFilter();
                    return;
                }
                var visibleStories = [];
                _this.appState.stories.forEach(function (s) {
                    if (s.title.toLowerCase().indexOf(_this.appState.listFilter) >= 0) {
                        visibleStories.push(s);
                    }
                });
                _this.appState.visibleStories = visibleStories;
                _this.appState.notifyStateChange();
                resolve();
            });
        };
        FilterStoryList.$inject = ["appState"];
        return FilterStoryList;
    }());
    Interactors.FilterStoryList = FilterStoryList;
})(Interactors || (Interactors = {}));
angular.module("NGApp").service("filterStoryList", Interactors.FilterStoryList);
