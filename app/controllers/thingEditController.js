wotApp.controller('thingEditController', function($scope, $stateParams, $state, ThingService) {
    $scope.datatypes = [{id: 1, name: "bool"}, {id: 2, name: "int"}, {id: 3, name: "decimal"}, {id: 4, name: "string"} ];

    //Edit
    if($stateParams.thingId){
        ThingService.getThingDetails($stateParams.thingId).then(function(res){

            $scope.thingName = res.data.name;
            $scope.thingDescription = res.data.description;
            $scope.thingLongitude = res.data.longitude;
            $scope.thingLatitude = res.data.latitude;

            $scope.properties = angular.copy(res.data.children);

        }, function(error){
            console.log('error during getThing');
        });
    }

    $scope.removeProperty = function(property) {
        alert(property.id + ' ' + property.description);
    };

    $scope.addNewProperty = function() {
        var newItemNo = $scope.properties.length;
        $scope.properties.push({"id": newItemNo, "sensors":[] });
    };

    $scope.addNewSensor = function(property) {
        $scope.properties[property.id].sensors.push([{"name": "", "datatype": ""}]);
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

        console.log(JSON.stringify($scope.properties));

        //ThingService.createThing(thing);
    };
});