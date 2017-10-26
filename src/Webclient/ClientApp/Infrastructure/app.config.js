var app = angular.module('NGApp');
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('NG::APP', {
            url: '/',
            views: {
                'search': {
                    templateUrl: '/ClientApp/Views/Search/search.template.html',
                    controller: 'searchController'
                },
                'results': {
                    templateUrl: '/ClientApp/Views/Results/results.template.html',
                    controller: 'resultsController'
                }
            }
        });
    }
]);
