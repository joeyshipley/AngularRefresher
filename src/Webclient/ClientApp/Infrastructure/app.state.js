var App;
(function (App) {
    var State = /** @class */ (function () {
        function State($rootScope) {
            this.$rootScope = $rootScope;
            this.isLoading = false;
            this.stories = [
                { id: 12345, title: 'hello 1' },
                { id: 67890, title: 'hello 2' }
            ];
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
            this.isLoading = false;
            this.stories = stories;
            this.notifyStateChange();
        };
        State.$inject = ["$rootScope"];
        return State;
    }());
    App.State = State;
})(App || (App = {}));
angular.module("NGApp").service("appState", App.State);
