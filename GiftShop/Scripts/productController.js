var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

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


        }]).controller("LoginController", function ($scope, LoginService, $localStorage) {


        $scope.LoginCheck = function () {
            var User = {
                username: $scope.uName,
                password: $scope.password
            };
           
            $("#divLoading").show();
            var getData = LoginService.UserLogin(User);
            getData.then(function (msg) {
                if (msg.data === "0") {
                    console.log(msg.data);
                    $localStorage.role = msg.data.role;
                    console.log($localStorage.role);
                    $("#divLoading").hide();
                    $("#alertModal").modal('show');
                    $scope.msg = "Password Incorrect !";
                }
                else if (msg.data === "-1") {
                    $("#divLoading").hide();
                    $("#alertModal").modal('show');
                    $scope.msg = "Username Incorrect !";
                }
                else {
                    uID = msg.data;
                    $("#divLoading").hide();
                    window.location.href = "/Home/Index";
                }
            });

        }

        function clearFields() {
            $scope.uName = '';
            $scope.uPwd = '';
        }

    }).service("LoginService", function ($http) {

        this.UserLogin = function (User) {
            var response = $http.post('/Login/Login/', JSON.stringify(User))
                .then(successCallback, errorCallback);
          
           
            return response;
        }


        function successCallback(response) {

            return response;
        }
        function errorCallback(error) {

            console.log(error);
        }


    });