wotApp.controller('sensorDetailController', ['$scope', '$stateParams', 'SensorService', function($scope, $stateParams, SensorService) {
    $scope.thingId = $stateParams.thingId;
    $scope.sensorId = $stateParams.sensorId;

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.gridColumns = [
        { field: "ticks", title: "Date" },
        { field: "value", title: "Value" }
    ];

    SensorService.getSensor($scope.thingId, $scope.sensorId).then(function(res){
        $scope.name = res.data.name;
    }, function(error){
        console.log('error during getSensors');
    });

    SensorService.getSensorValues($scope.thingId, $scope.sensorId).then(function(res){
        var data = res.data;
        $scope.gridData = new kendo.data.DataSource({
            data: data,
            schema:{
                parse:function (response) {
                    $.each(response, function (idx, elem) {
                        if (elem.ticks && typeof elem.ticks === "string") {
                            elem.ticks = moment(elem.ticks).format("MMM Do YY");
                        }
                    });
                    return response;
                }
            },
            pageSize: 10
        });
        $scope.lastValue = data[0].value;
        $scope.lastUpdated = moment(data[0].ticks).startOf("minutes").fromNow();
    }, function(error){
        console.log('error during getSensorValues');
    });
}]);