var App;
(function (App) {
    var State = /** @class */ (function () {
        function State($rootScope) {
            this.$rootScope = $rootScope;
            this.isLoading = false;
            this.stories = [];
        }
        State.prototype.subscribeStateChange = function (scope, $scope) {
            var handler = this.$rootScope.$on('app-state-changed', function () {
                scope.render.apply(scope)
                    .then(function () {
                    $scope.$apply();
                });
            });
            $scope.$on('$destroy', handler);
        };
        State.prototype.notifyStateChange = function () {
            this.$rootScope.$emit('app-state-changed');
        };
        State.prototype.setDataIsLoading = function () {
            this.isLoading = true;
            this.notifyStateChange();
        };
        State.prototype.persistStories = function (stories) {
            var _this = this;
            this.isLoading = false;
            var newStories = [];
            stories.forEach(function (s) {
                if (!_this.storyExists(s.id)) {
                    newStories.push(s);
                }
            });
            this.stories = this.stories.concat(newStories);
            this.notifyStateChange();
        };
        State.prototype.storyExists = function (id) {
            var story = this.stories.find(function (s) { return s.id == id; });
            return story != null;
        };
        State.$inject = ["$rootScope"];
        return State;
    }());
    App.State = State;
})(App || (App = {}));
angular.module("NGApp").service("appState", App.State);
//# sourceMappingURL=app.state.js.map