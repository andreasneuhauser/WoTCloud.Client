wotApp.controller('thingDetailController', function($scope, $stateParams, $state, ThingService) {

    $scope.thingId = $stateParams.thingId;

    $scope.$on("kendoWidgetCreated", function(event, widget){
        if (widget === $scope.sensorGrid) {
            $scope.sensorGrid.element.on('dblclick', function (e) { $state.go('SensorDetail', { thingId: $scope.thingId, sensorId: $scope.selectedItem.id }) });
        }
    });

    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "group", title: "Group", hidden: true }
    ];

    ThingService.getThing($scope.thingId).then(function(res){
        $scope.name = res.data.name;
        $scope.description = res.data.description;

        $scope.map = { center: { latitude: res.data.latitude, longitude: res.data.longitude }, zoom: 6 };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: res.data.latitude,
                longitude: res.data.longitude
            }
        };
    }, function(error){
        console.log('error during getThing');
    });

    ThingService.getSensors($scope.thingId).then(function(res){
        var dataSource = new kendo.data.DataSource({
            data: res.data,
            group: { field: "group" }});
        $scope.gridData = dataSource;
    }, function(error){
        console.log('error during getSensors');
    });

    $scope.viewSensor = function() {
        $state.go('SensorDetail', { thingId: $scope.thingId, sensorId: $scope.selectedItem.id });
    };

    $scope.refresh = function() {
        ThingService.getSensors($scope.thingId).then(function(res){
            var dataSource = new kendo.data.DataSource({
                data: res.data,
                group: { field: "group" }});
            $scope.gridData = dataSource;
        }, function(error){
            console.log('error during getSensors');
        });
    };
});