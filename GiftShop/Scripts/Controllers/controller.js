var myapp = angular.module('myApp', ['angularFileUpload']);
angular.module('myApp').controller('MyCtrl', ['$scope', '$upload', function ($scope, $upload) {
    console.log('asda');
    var uploader = new FileUploader();
    uploader.yourMethod = function () {/*code here*/ };

    $scope.onFileSelect = function ($files) {


        console.log('e' + $files); // undefined
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/cards/avatar/save_from_disk', //upload.php script, node.js route, or servlet url
                data: {
                    myObj: $scope.myModelObj
                },
                file: file,
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });
        }
    };
    console.log($upload);
}]);