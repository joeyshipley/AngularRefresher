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

    beforeEach(angular.mock.module('NGApp'));

    beforeEach(function() {
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $controller = $injector.get('$controller');
        });
    });

    describe('NG::Controllers', function () {

        describe('resultsController', function() {

            describe('When loading the controller', function() {
                it('sets the default scope values', function() {
                    var controller = $controller('resultsController', { $scope: $scope });

                    expect($scope.title).toBe("Results View");
                    expect($scope.isLoading).toBe(true);
                    expect($scope.stories.length).toBe(0);
                });
            });
            
        });
    });  

});