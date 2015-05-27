wotApp.controller('actuatorDetailController', function($scope, $stateParams, ActuatorService) {
    $scope.thingId = $stateParams.thingId;
    $scope.actuatorId = $stateParams.actuatorId;

    ActuatorService.getActuator($scope.thingId, $scope.actuatorId).then(function(res){
        $scope.name = res.data.name;
        $scope.uri = res.data.uri;
    }, function(error){
        console.log('error during getActuator');
    });

    $scope.fireActuator = function() {
        ActuatorService.fireActuator($scope.thingId, $scope.actuatorId, $scope.txtNewValue).then(function(res){
            $scope.txtNewValue = "";
        }, function(error){
            $scope.txtNewValue = "";
        });
    };
});