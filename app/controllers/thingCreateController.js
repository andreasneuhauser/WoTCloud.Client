wotApp.controller('thingCreateController', function($scope, $stateParams, $state, ThingService) {
    $scope.datatypes = [{id: 1, name: "bool"}, {id: 2, name: "int"}, {id: 3, name: "decimal"}, {id: 4, name: "string"} ];
    $scope.properties = [{id: 0, name: 'General', ismainthing: true, sensors: [], actuators: []}];

    $scope.map = {center: {latitude: 48.30694, longitude: 14.28583 }, zoom: 6 };
    $scope.options = {scrollwheel: false};
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 48.30694,
            longitude: 14.28583
        },
        options: { draggable: true }
    };

    ThingService.getThings().then(function(res){
        $scope.templateDataSource = new kendo.data.DataSource({
            data: res.data });
    }, function(error){
        console.log('error during getThings');
    });

    $scope.applyTemplate = function() {
        ThingService.getThingDetails($scope.selectedTemplate).then(function(res){

            $scope.thingName = res.data.name;
            $scope.thingDescription = res.data.description;
            $scope.properties = res.data.children;

        }, function(error){
            console.log('error during getThing');
        });
    }

    $scope.addNewProperty = function() {
        var max = 0;
        for (var i = 1; i < $scope.properties.length; i++) {
            if ($scope.properties[i].id > max) {
                max = $scope.properties[i].id;
            }
        }

        $scope.properties.push({"id": max + 1, "changed": true, "sensors":[], "actuators":[] });
    };

    $scope.addNewSensor = function(property) {
        var index = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.properties[index].sensors.push({"name": "", "datatype": 4, "changed": true});
    };

    $scope.addNewActuator = function(property) {
        var index = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.properties[index].actuators.push({"name": "", "uri": "", "changed": true});
    };

    $scope.removeThing = function(property) {
        var index = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.properties.splice(index, 1);
    };

    $scope.removeSensor = function(property, sensor) {
        var indexProp = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        var indexSens = $scope.properties[indexProp].sensors.map(function(el) {
            return el.name;
        }).indexOf(sensor.name);

        $scope.properties[indexProp].sensors.splice(indexSens, 1);
    };

    $scope.removeActuator = function(property, act) {
        var indexProp = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        var indexSens = $scope.properties[indexProp].actuators.map(function(el) {
            return el.name;
        }).indexOf(act.name);

        $scope.properties[indexProp].actuators.splice(indexSens, 1);
    };

    $scope.submit = function() {
        var thing =
        {
            "name": $scope.thingName,
            "description": $scope.thingDescription,
            "longitude": $scope.marker.coords.longitude,
            "latitude": $scope.marker.coords.latitude,
            "children": $scope.properties
        };

        console.log(JSON.stringify(thing));

        ThingService.createThing(thing).then(function(res){
            $state.go('Things');
        }, function(error){
            alert(error);
            console.log('error during createThing');
        });
    };
});