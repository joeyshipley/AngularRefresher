module App {
    export class State {
        static $inject = [ "$rootScope" ];
        constructor(
            public $rootScope: any
        ) {}

        public isLoading: boolean = false;
        public stories: any = [];
        public visibleStories: any = [];
        public selectedStory: any = null;
        public listFilter: string = null;

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
            var newStories = [];
            stories.forEach((s) => {
                if (!this.storyExists(s.id)) {
                    newStories.push(s);
                }
            });
            this.stories = this.stories.concat(newStories);
            this.visibleStories = this.stories;
            this.notifyStateChange();
        }

        public storyExists(id) {
            const story = this.stories.find((s) => { return s.id == id; });
            return story != null;
        }

        public selectStory(id) {
            const story = this.stories.find((s) => { return s.id == id; });
            this.selectedStory = story;
            this.notifyStateChange();
        }

        public clearSelectedStory() {
            this.selectedStory = null;
            this.notifyStateChange();
        }
        
        public clearListFilter() {
            this.listFilter = null;
            this.visibleStories = this.stories;
            this.notifyStateChange();
        }
    }
}
angular.module("NGApp").service("appState", App.State);