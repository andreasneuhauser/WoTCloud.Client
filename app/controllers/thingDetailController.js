wotApp.controller('thingDetailController', function($scope, $stateParams, $state, ThingService, SensorService, RuleService, ActuatorService) {

    $scope.thingId = $stateParams.thingId;

    $scope.$on("kendoWidgetCreated", function(event, widget){
        if (widget === $scope.sensorGrid) {
            $scope.sensorGrid.element.on('dblclick', function (e) { $state.go('SensorDetail', { thingId: $scope.thingId, sensorId: $scope.selectedSensorItem.id }) });
        }
        if (widget === $scope.actuatorGrid) {
            $scope.actuatorGrid.element.on('dblclick', function (e) { $state.go('ActuatorDetail', { thingId: $scope.thingId, actuatorId: $scope.selectedActuatorItem.id }) });
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
            group: { field: "group" },
            pageSize: 10
        });
        $scope.sensorData = dataSource;
    }, function(error){
        console.log('error during getSensors');
    });

    ThingService.getActuators($scope.thingId).then(function(res){
        var dataSource = new kendo.data.DataSource({
            data: res.data,
            group: { field: "group" },
            pageSize: 15
        });
        $scope.actuatorData = dataSource;
    }, function(error){
        console.log('error during getActuators');
    });

    RuleService.getRules($scope.thingId).then(function(res){
        var dataSource = new kendo.data.DataSource({
            data: res.data,
            pageSize: 15
        });
        $scope.ruleData = dataSource;
    }, function(error){
        console.log('error during getRules');
    });

    $scope.viewSensor = function() {
        $state.go('SensorDetail', { thingId: $scope.thingId, sensorId: $scope.selectedSensorItem.id });
    };

    $scope.viewActuator = function() {
        $state.go('ActuatorDetail', { thingId: $scope.thingId, actuatorId: $scope.selectedActuatorItem.id });
    };

    $scope.deleteSensor = function() {
        SensorService.deleteSensor($scope.thingId, $scope.selectedSensorItem.id).then(function(res){
            $scope.refreshSensors();
        }, function(error){
            console.log('error during deleteSensor');
        });
    };

    $scope.deleteActuator = function() {
        ActuatorService.deleteActuator($scope.thingId, $scope.selectedActuatorItem.id).then(function(res){
            $scope.refreshActuators();
        }, function(error){
            console.log('error during deleteActuator');
        });
    };

    $scope.deleteRule = function() {
        RuleService.deleteRule($scope.thingId, $scope.selectedRuleItem.id).then(function(res){
            $scope.refreshRules();
        }, function(error){
            console.log('error during deleteRule');
        });
    };

    $scope.refreshSensors = function() {
        ThingService.getSensors($scope.thingId).then(function(res){
            var dataSource = new kendo.data.DataSource({
                data: res.data,
                group: { field: "group" }});
            $scope.sensorData = dataSource;
        }, function(error){
            console.log('error during getSensors');
        });
    };

    $scope.refreshRules = function() {
        RuleService.getRules($scope.thingId).then(function(res){
            var dataSource = new kendo.data.DataSource({
                data: res.data,
                pageSize: 15
            });
            $scope.ruleData = dataSource;
        }, function(error){
            console.log('error during getRules');
        });
    };

    $scope.refreshActuators = function() {
        ThingService.getActuators($scope.thingId).then(function(res){
            var dataSource = new kendo.data.DataSource({
                data: res.data,
                pageSize: 15
            });
            $scope.actuatorData = dataSource;
        }, function(error){
            console.log('error during getActuators');
        });
    }
});