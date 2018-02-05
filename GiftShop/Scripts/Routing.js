angular.module('myApp', ['ngRoute', 'LocalStorageModule'])
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
                templateUrl: '/Products/index.html',
                controller: 'DeleteController'
            }).
            otherwise(
            {
                redirectTo: '/list'
            });
    }).config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('myApp');
    }).controller('HomeController', ['$scope', '$http', 'localStorageService', '$location',
        function ($scope, $http, localStorageService, $location) {

        $scope.idProduct = '';
        // Get all products
        $http.get('/api/product').then(successCallback, errorCallback);

        // Funtion for delete a product
        $scope.delete = function ($id) {
            $scope.idProduct = $id;
            
        };

        $scope.confirmDelete = function () {
            $http.delete('/api/product/' + $scope.idProduct).then(successDelCallback, errorCallback);
           // $location.reload();
            $location.path('#!/list');
        }

        //CallBacks
        function successDelCallback(response) {
            console.log(response);

        }
        function successCallback(response) {
            $scope.Products = response.data;

        }
        function errorCallback(error) {
            $scope.error = "An error has ocurred.";
            console.log(error);
        }

    }]).controller("EditController", ['$scope', '$filter', '$http', '$routeParams', '$location',
        function ($scope, $filter, $http, $routeParams, $location) {

            if ($routeParams.id) {
                $scope.title = "Edit Product";
                $scope.id = $routeParams.id;
                $http.get('/api/product/' + $routeParams.id).then(successCallback, errorCallback);

                function successCallback(response) {
                    $scope.Products = response.data;
                    $scope.id = $scope.Products.ID;
                    $scope.name = $scope.Products.name;
                    $scope.description = $scope.Products.description;
                    $scope.category = $scope.Products.category;
                    $scope.quantity = $scope.Products.quantity;
                    $scope.image = $scope.Products.image;
                    // image
                    $scope.price = $scope.Products.price;

                }
                function errorCallback(error) {
                    $scope.error = "An error has ocurred.";
                }
            } else {
                $scope.title = "Create New Product";
            }
            $scope.save = function () {
                var obj = {
                    name: $scope.name,
                    description: $scope.description,
                    category: $scope.category,
                    quantity: $scope.quantity,
                    image: $scope.image,
                    price: $scope.price
                }
                // Create new product 
                if ($scope.ID == null) {
                    console.log(obj);
                    $http.post('/api/product/', obj).then(successCallback, errorCallback);

                } else {
                    var fd = new FormData();
                    fd.append('name', $scope.name);

                    console.log(obj);
                    // Update
                    /*$scope.promise = $http.put('/api/product/', fd, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': 'application/json' }
                    }).then(successCallback, errorCallback);
                   return $scope.promsie;*/
                }

                
                function successCallback(response) {
                   // alert('Created');
                    $location.path('/list');  
                    //console.log('yes');

                }
                function errorCallback(error) {
                    alert('An error has ocurred, please try again');
                    //console.log(error);
                    $scope.error = "An error has ocurred.";
                }

            };

        }]);