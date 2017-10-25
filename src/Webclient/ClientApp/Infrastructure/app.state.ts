﻿declare var angular: any;

module App {
    export class State {
        static $inject = [ "$rootScope" ];
        constructor(
            public $rootScope: any
        ) {}

        public isLoading: boolean = false;

        public stories: any = [
            { id: 12345, title: 'hello 1' },
            { id: 67890, title: 'hello 2' }
        ];

        public subscribeStateChange(scope, $scope) {
            var handler = this.$rootScope.$on('app-state-changed', () => {
                scope.render.apply(scope)
                    .then(() => {
                        $scope.$apply();
                    });
            });
            $scope.$on('$destroy', handler);
        }

        public notifyStateChange() {
            this.$rootScope.$emit('app-state-changed');
        }

        public setDataIsLoading() {
            this.isLoading = true;
            this.notifyStateChange();
        }

        public persistStories(stories: any[]) {
            this.isLoading = false;
            this.stories = stories;
            this.notifyStateChange();
        }
    }
}
angular.module("NGApp").service("appState", App.State);