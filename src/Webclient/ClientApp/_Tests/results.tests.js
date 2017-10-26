/// <reference path="../../Assets/Scripts/babel-polyfill.min.js" />
/// <reference path="../../Assets/Scripts/angular.min.js" />
/// <reference path="../../Assets/Scripts/angular.mocks.js" />
/// <reference path="../../Assets/Scripts/angular.ui-router.min.js" />
/// <reference path="../../Assets/Scripts/angular.sanitize.min.js" />

/// <reference path="../Infrastructure/app.module.js" />
/// <reference path="../Infrastructure/app.state.js" />
/// <reference path="../External/hackerNews.service.js" />
/// <reference path="../Interactors/retrieveBestStories.interactor.js" />
/// <reference path="../Views/Results/results.controller.js" />

describe('ClientApp::Results', function() {
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

        describe('resultsController', function() {

            describe('When loading the controller', function() {
                it('sets the default scope values', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, []);
                    var controller = $controller('resultsController', { $scope: $scope });

                    expect($scope.isLoading).toBe(true);
                    expect($scope.stories.length).toBe(0);

                    $httpBackend.flush();
                });
            });
            
            describe('When loading the stories', function() {
                it('gets the stories from the API', function(done) {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, [ 1, 2 ]);
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty").respond(200, { id: 1, title: "Story 1" });
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty").respond(200, { id: 2, title: "Story 2" });

                    var controller = $controller('resultsController', { $scope: $scope });
                    $httpBackend.flush();

                    controller.init().then(() => {
                        expect($scope.isLoading).toBe(false);
                        expect($scope.stories.length).toBe(2);

                        done();
                    });
                    $httpBackend.flush();
                });

                it('does request stories already fetched from the API', function(done) {
                    var appState = $$injector.get('appState');
                    appState.stories = [ { id: 1, title: 'Already Loaded' } ];

                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, [ 1, 2 ]);
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty").respond(200, { id: 1, title: "Reloaded" });
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty").respond(200, { id: 2, title: "Story 2" });

                    var controller = $controller('resultsController', { $scope: $scope });
                    $httpBackend.flush();

                    controller.init().then(() => {
                        expect($scope.stories[0].title).toBe("Already Loaded");

                        done();
                    });
                    $httpBackend.flush();
                });
            });

            describe('When determining the view show states', function() {
                it('correctly determines the show loading message state', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, []);
                    var controller = $controller('resultsController', { $scope: $scope });

                    expect(controller.showLoadingMessage()).toBe(true);

                    controller.init().then(() => {
                        expect(controller.showLoadingMessage()).toBe(false);

                        done();
                    });
                    $httpBackend.flush();
                });

                it('correctly determines the show list state', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, []);
                    var controller = $controller('resultsController', { $scope: $scope });

                    expect(controller.showList()).toBe(false);

                    controller.init().then(() => {
                        expect(controller.showList()).toBe(true);

                        done();
                    });
                    $httpBackend.flush();
                });

                it('correctly determines the show details state', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, [ 1 ]);
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty").respond(200, { id: 1, title: "Story 1" });
                    var controller = $controller('resultsController', { $scope: $scope });

                    expect(controller.showDetails()).toBe(false);
                    $httpBackend.flush();

                    controller.init().then(() => {

                        controller.selectState(1);
                        expect(controller.showDetails()).toBe(true);

                        done();
                    });
                    $httpBackend.flush();
                });
            });

            describe('When selected stories are considered', function() {
                it('can set the selected story', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, [ 1 ]);
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty").respond(200, { id: 1, title: "Story 1" });
                    var controller = $controller('resultsController', { $scope: $scope });
                    $httpBackend.flush();

                    controller.init().then(() => {

                        controller.selectState(1);
                        expect($scope.selectedStory.id).toBe(1);

                        done();
                    });
                    $httpBackend.flush();
                });

                it('clears the selected story', function() {
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/beststories.json").respond(200, [ 1 ]);
                    $httpBackend.when('GET', "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty").respond(200, { id: 1, title: "Story 1" });
                    var controller = $controller('resultsController', { $scope: $scope });
                    $httpBackend.flush();

                    controller.init().then(() => {

                        controller.selectState(1);
                        expect($scope.selectedStory.id).toBe(1);

                        controller.clearSelectedStory();
                        expect($scope.selectedStory).toBe(null);

                        done();
                    });
                    $httpBackend.flush();
                });
            });

        });
    });  

});