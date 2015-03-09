'use strict';
wotApp.controller('registerController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        name: "",
        username: "",
        isActive: true,
        password: "",
        confirmpassword: ""
    };

    $scope.signUp = function () {
        authService.saveRegistration($scope.registration).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();
            },
            function (response) {
                $scope.message = "Failed to register user due to:" + response.data.Message;
                console.log('Error while creating a new tenant: "' + $scope.message);
            });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }
}]);