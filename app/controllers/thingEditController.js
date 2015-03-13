wotApp.controller('thingEditController', function($scope, $stateParams, $state, ThingService) {
    $scope.datatypes = [{id: 1, name: "bool"}, {id: 2, name: "int"}, {id: 3, name: "decimal"}, {id: 4, name: "string"} ];

    //Edit
    if($stateParams.thingId){
        ThingService.getThingDetails($stateParams.thingId).then(function(res){

            $scope.thingName = res.data.name;
            $scope.thingDescription = res.data.description;
            $scope.thingLongitude = res.data.longitude;
            $scope.thingLatitude = res.data.latitude;

            $scope.properties = res.data.children;

        }, function(error){
            console.log('error during getThing');
        });
    }

    $scope.addNewProperty = function() {
        var max = -1;
        for (var i = 1; i < $scope.properties.length; i++) {
            if ($scope.properties[i].id > max) {
                max = $scope.properties[i].id;
            }
        }

        $scope.properties.push({"id": max + 1, "changed": true,"sensors":[] });
    };

    $scope.addNewSensor = function(property) {
        var index = $scope.properties.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.properties[index].sensors.push({"name": "", "datatype": 4, "changed": true});
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

    $scope.submit = function() {
        var thing =
        {
            "name": $scope.thingName,
            "description": $scope.thingDescription,
            "longitude": $scope.thingLongitude,
            "latitude": $scope.thingLatitude,
            "children": $scope.properties
        };

        ThingService.editThing($stateParams.thingId, thing).then(function(res){
            $state.go('Things');
        }, function(error){
            console.log('error during editThing');
        });
    };
});