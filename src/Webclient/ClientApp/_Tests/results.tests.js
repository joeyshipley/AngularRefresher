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
    var $scope, $rootScope, $controller;
    var $httpBackend;

    beforeEach(angular.mock.module('NGApp'));

    beforeEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

        inject(function($injector) {
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

                    expect($scope.title).toBe("Results View");
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
            });
        });
    });  

});