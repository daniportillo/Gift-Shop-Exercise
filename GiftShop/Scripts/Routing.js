angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/list',
            {
                templateUrl: '/Products/index.html',
                controller: 'HomeController'
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
            }).
            otherwise(
            {
                redirectTo: '/list'
            });  
    }).controller('HomeController', ['$scope', '$http', function ($scope, $http) {

        $http.get('/api/product').then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.Products = response.data;
            
        }
        function errorCallback(error) {
            $scope.error = "An error has ocurred.";
        }
        }]);