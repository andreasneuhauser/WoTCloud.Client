wotApp.controller('sensorDetailController', ['$scope', '$stateParams', 'SensorService', function($scope, $stateParams, SensorService) {
    $scope.thingId = $stateParams.thingId;
    $scope.sensorId = $stateParams.sensorId;

    $scope.gridColumns = [
        { field: "ticks", title: "Date", format:"{0:dd.MM.yyyy, HH:mm:ss}" },
        { field: "value", title: "Value" }
    ];

    SensorService.getSensor($scope.thingId, $scope.sensorId).then(function(res){
        $scope.name = res.data.name;
    }, function(error){
        console.log('error during getSensors');
    });

    $scope.refresh = function() {
        SensorService.getSensorValues($scope.thingId, $scope.sensorId).then(function(res){
            var data = res.data;

            $scope.chartData = new kendo.data.DataSource({
                data: data,
                schema: {
                    model: {
                        fields: {
                            ticks: {
                                type: "date",
                                parse: function(value) {
                                    return new Date(value);
                                }
                            }
                        }
                    }
                },
                sort: {
                    field: "ticks",
                    dir: "asc"
                }
            });

            $scope.gridData = new kendo.data.DataSource({
                data: data,
                schema: {
                    model: {
                        fields: {
                            ticks: {
                                type: "date",
                                parse: function(value) {
                                    return new Date(value * 1000);
                                }
                            }
                        }
                    }
                }
            });
            $scope.lastValue = data[0].value;
            $scope.lastUpdated = moment(new Date(data[0].ticks * 1000)).startOf("minutes").fromNow();
        }, function(error){
            console.log('error during getSensorValues');
        });
    }

    //Initial call
    $scope.refresh();

    $scope.addNewValue = function() {
        SensorService.addNewValue($scope.thingId, $scope.sensorId, $scope.txtNewValue).then(function(res){
            $scope.txtNewValue = "";
            $scope.refresh();
        });
    };
}]);