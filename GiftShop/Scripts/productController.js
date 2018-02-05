var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('productController', ['$scope', '$http', function ($scope, $http) {

    $http({
        method: 'GET',
        url: 'api/product'
    }).then(function (response) {
        $scope.Products = angular.fromJson(response.data);

    }, function (error) {
        $scope.error = "An error has ocurred.";
    });


}]).controller("DetailsController", ['$scope', '$filter', '$http', '$routeParams', '$location',
    function ($scope, $filter, $http, $routeParams, $location) {

        //       console.log($location.absUrl());
        var splitUrl = $location.absUrl().split('/');

        $http.get('/api/product/' + splitUrl[5]).then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.Products = response.data;
            $scope.id = $scope.Products.ID;
            $scope.name = $scope.Products.name;
            $scope.description = $scope.Products.description;
            $scope.category = $scope.Products.category;
            $scope.quantity = $scope.Products.quantity;
            $scope.image = $scope.Products.image;
            $scope.price = $scope.Products.price;
           // console.log($scope.Products);

        }
        function errorCallback(error) {
            $scope.error = "An error has ocurred.";
        }


    }]);