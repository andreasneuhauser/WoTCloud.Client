wotApp.controller('sensorDetailController', ['$scope', '$stateParams', 'SensorService', function($scope, $stateParams, SensorService) {
    $scope.thingId = $stateParams.thingId;
    $scope.sensorId = $stateParams.sensorId;

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [28, 48, 40, 19, 86, 27, 90]
    ];

    SensorService.getValues().then(function(res){
        var data = res.data;
        $scope.lastValue = data[0].value;
        $scope.lastUpdated = moment(data[2].ticks).startOf("minutes").fromNow();
        //$scope.lastUpdated = moment.unix(data[2].ticks).format("MMM Do YY");
    }, function(error){
        console.log('error during getSensors');
    });
}]);