angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
 
            .when('/list',
            {
                templateUrl: '/Products/index.html',
                controller: ''
            })
            .when('/create',
            {
                templateUrl: '/Products/edit.html',
                controller: 'EditController'
            })
            .when('/edit/:id',
            {
                templateUrl: '/Products/edit.html',
                controller: 'EditController'
            })
            .when('/delete',
            {
                templateUrl: '/Products/delete.html',
                controller: 'DeleteController'
            })
    }).controller('HomeController', function ($scope) {
        $scope.Message = "hi";
    });
    
