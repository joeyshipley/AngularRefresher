/// <reference path="../../Assets/Scripts/babel-polyfill.min.js" />
/// <reference path="../../Assets/Scripts/angular.min.js" />
/// <reference path="../../Assets/Scripts/angular.mocks.js" />
/// <reference path="../../Assets/Scripts/angular.ui-router.min.js" />
/// <reference path="../../Assets/Scripts/angular.sanitize.min.js" />

/// <reference path="../Infrastructure/app.module.js" />
/// <reference path="../Infrastructure/app.state.js" />
/// <reference path="../Interactors/filterStoryList.interactor.js" />
/// <reference path="../Views/Search/search.controller.js" />

describe('ClientApp::Search', function() {
    var $$injector, $scope, $rootScope, $controller, $httpBackend;

    beforeEach(angular.mock.module('NGApp'));

    beforeEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

        inject(function($injector) {
            $$injector = $injector;
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = $injector.get('$controller');

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
    });

    describe('NG::Controllers', function () {

        describe('searchController', function() {

            describe('When loading the controller', function() {
                it('sets the default scope values', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    expect($scope.filterText).toBe("");
                    expect($scope.isLoading).toBe(false);
                    expect($scope.isListView).toBe(true);
                });
            });

            describe('When determining if the search should be shown', function() {
                it('shows the search when results have been loaded', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.isLoading = false;
                    appState.selectedStory = null;
                    appState.notifyStateChange();

                    expect(controller.showFilterControl()).toBe(true);
                });

                it('does not show the search while results are loading', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.isLoading = true;
                    appState.selectedStory = null;
                    appState.notifyStateChange();

                    expect(controller.showFilterControl()).toBe(false);
                });

                it('does not show the search when a story has been selected', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.isLoading = false;
                    appState.selectedStory = { id: 1, title: 'Example' };
                    appState.notifyStateChange();

                    expect(controller.showFilterControl()).toBe(false);
                });
            });

            describe('When filtering the list of stories', function() {
                it('restricts the list based on the search', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.stories = [
                        { id: 1, title: 'First Story' },
                        { id: 2, title: 'Second Story' } 
                    ];
                    appState.notifyStateChange();

                    controller.$scope.filterText = "FIRST";
                    controller.filterList();

                    expect(appState.listFilter).toBe("first");
                    expect(appState.visibleStories.length).toBe(1);
                });

                it('shows all of the results when no filter is set', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.stories = [
                        { id: 1, title: 'First Story' },
                        { id: 2, title: 'Second Story' } 
                    ];
                    appState.notifyStateChange();

                    controller.$scope.filterText = "";
                    controller.filterList();

                    expect(appState.listFilter).toBe(null);
                    expect(appState.visibleStories.length).toBe(2);
                });

                it('shows all of the results when a prior filter is cleared', function() {
                    var controller = $controller('searchController', { $scope: $scope });

                    var appState = $$injector.get('appState');
                    appState.stories = [
                        { id: 1, title: 'First Story' },
                        { id: 2, title: 'Second Story' } 
                    ];
                    appState.notifyStateChange();

                    controller.$scope.filterText = "First";
                    controller.filterList();

                    controller.clearFilter();

                    expect(appState.listFilter).toBe(null);
                    expect(appState.visibleStories.length).toBe(2);
                });
            });

        });
    });  

});