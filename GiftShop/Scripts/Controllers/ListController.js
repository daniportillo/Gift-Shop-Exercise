var myApp = angular.module('myApp');

var ListController = function ($scope, $http, NgMap) {
    $scope.message = " hi";
}

myApp.controller('ListController', ['$scope', '$http', ListController]);