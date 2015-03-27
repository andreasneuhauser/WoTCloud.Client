wotApp.controller('templateCreateController', function($scope, $stateParams, $state, TemplateService) {
    $scope.isPublic = $stateParams.isPublic;
    $scope.datatypes = [{id: 1, name: "bool"}, {id: 2, name: "int"}, {id: 3, name: "decimal"}, {id: 4, name: "string"} ];
    $scope.properties = [{id: 0, name: 'General', ismainthing: true, sensors: [], actuators: []}];

    $scope.addNewProperty = function() {
        var max = 0;
        for (var i = 1; i < $scope.properties.length; i++) {
            if ($scope.properties[i].id > max) {
                max = $scope.properties[i].id;
            }
        }

        $scope.properties.push({"id": max + 1, "changed": true, "sensors": [], "actuators": []});
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
            "children": $scope.properties
        };

        if($scope.isPublic == 'true')
        {
            TemplateService.createPublicTemplate(thing).then(function(res){
                $state.go('Templates');
            }, function(error){
                alert(error);
                console.log('error during createPublicTemplate');
            });
        }
        if($scope.isPublic == 'false')
        {
            TemplateService.createPrivateTemplate(thing).then(function(res){
                $state.go('Templates');
            }, function(error){
                alert(error);
                console.log('error during createPrivateTemplate');
            });
        }
    };
});