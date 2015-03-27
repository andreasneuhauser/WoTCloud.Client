wotApp.controller('actuatorDetailController', function($scope, $stateParams, SensorService) {
    $scope.thingId = $stateParams.thingId;
    $scope.actuatorId = $stateParams.actuatorId;

    SensorService.getSensor($scope.thingId, $scope.sensorId).then(function(res){
        $scope.name = res.data.name;
    }, function(error){
        console.log('error during getSensors');
    });

    $scope.setNewValue = function() {
    };
});