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
                    if (_this.matchByTitle(s) || _this.matchByAuthor(s)) {
                        visibleStories.push(s);
                    }
                });
                _this.appState.visibleStories = visibleStories;
                _this.appState.notifyStateChange();
                resolve();
            });
        };
        FilterStoryList.prototype.matchByTitle = function (story) {
            return story.title.toLowerCase().indexOf(this.appState.listFilter) >= 0;
        };
        FilterStoryList.prototype.matchByAuthor = function (story) {
            return story.by.toLowerCase().indexOf(this.appState.listFilter) >= 0;
        };
        FilterStoryList.$inject = ["appState"];
        return FilterStoryList;
    }());
    Interactors.FilterStoryList = FilterStoryList;
})(Interactors || (Interactors = {}));
angular.module("NGApp").service("filterStoryList", Interactors.FilterStoryList);
//# sourceMappingURL=filterStoryList.interactor.js.map