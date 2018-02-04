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


}]);