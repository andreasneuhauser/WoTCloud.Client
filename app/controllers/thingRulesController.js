wotApp.controller('thingRulesController', function($scope, $stateParams, $state, ThingService) {
    $scope.rules =[{id: 0, name:"", istimedriven: false, eventtime: "", csensorId: "", coperatorId:"", cvalue: "", isactionactuator: true, actuatorid:"", actuatorvalue: "", emailto: "", emailtext: ""}];
    $scope.operatorDataSource = new kendo.data.DataSource({ data: [{id: 0, name:"kleiner"}, {id: 1, name:"kleiner gleich"}, {id: 2, name:"gr\u00f6sser"}, {id: 3, name:"gr\u00f6sser gleich"}, {id: 4, name:"gleich"}, {id: 5, name:"ungleich"}] });
    $scope.thingId = $stateParams.thingId;

    //if template was selected during creation
    if ($stateParams.templateId) {
        ThingService.getThingDetails($stateParams.templateId).then(function(res){
            $scope.rules = res.data.rules;
        }, function(error){
            console.log('error during getThingDetails');
        });
    }

    ThingService.getSensors($scope.thingId).then(function(res){
        $scope.sensorDataSource = new kendo.data.DataSource({
            data: res.data });
    }, function(error){
        console.log('error during getSensors');
    });

    ThingService.getActuators($scope.thingId).then(function(res){
        $scope.actuatorDataSource = new kendo.data.DataSource({
            data: res.data });
    }, function(error){
        console.log('error during getActuators');
    });

    $scope.addNewRule = function(property) {
        var max = 0;
        for (var i = 1; i < $scope.rules.length; i++) {
            if ($scope.rules[i].id > max) {
                max = $scope.rules[i].id;
            }
        }

        $scope.rules.push({id: max + 1, name:"", istimedriven: false, eventtime: "", csensorId: "", coperatorId:"", cvalue: "", isactionactuator: true, actuatorid:"", actuatorvalue: "", emailto: "", emailtext: ""});
    };

    $scope.removeRule = function(property) {
        var index = $scope.rules.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.rules.splice(index, 1);
    };

    $scope.submit = function() {
        console.log(JSON.stringify($scope.rules));
    };
});