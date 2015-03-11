wotApp.controller('thingCreateController', function($scope, $stateParams, $state, ThingService) {
    $scope.datatypes = [{id: 1, name: "bool"}, {id: 2, name: "int"}, {id: 3, name: "decimal"}, {id: 4, name: "string"} ];
    $scope.properties = [{id: 0, name: 'General', description: 'test', isMainThing: true, sensors: [{ id: 0, name: 's1', datatype: 1}]}, {id: 1, name: 'test2', description: 'test', sensors: [{ id: 0, name: 's1', datatype: 2}]}, {id: 2, name: 'test3', description: 'test', sensors: [{ id: 0, name: 's1', datatype: 3}]}];

    $scope.removeProperty = function(property) {
        alert(property.id + ' ' + property.description);
    };

    $scope.addNewProperty = function() {
        var newItemNo = $scope.properties.length;
        $scope.properties.push({"id": newItemNo, "sensors":[] });
    };

    $scope.addNewSensor = function(property) {
        $scope.properties[property.id].sensors.push([{'name': '', 'datatype': 4}]);
    };

    $scope.removeThing = function(property) {
        $scope.properties.splice(property.id, 1);
    };

    $scope.removeSensor = function(property, sensor) {
        $scope.properties[property.id].sensors.splice(sensor.id, 1);
    };

    $scope.submit = function() {
        var thing =
        {
            "name": $scope.thingName,
            "description": $scope.thingDescription,
            "longitude": $scope.thingLongitude,
            "latitude": $scope.thingLatitude,
            "children": $scope.properties
        };

        ThingService.createThing(thing);
    };
});