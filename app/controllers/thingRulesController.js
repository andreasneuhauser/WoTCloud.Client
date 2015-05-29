wotApp.controller('thingRulesController', function($scope, $stateParams, $state, ThingService, RuleService) {
    $scope.rules =[{id: 0, name:"", istimedriven: false, eventtime: "", csensorid: "", coperatorid:"", cvalue: "", isactionactuator: true, actuatorid:"", actuatorvalue: "", emailto: "", emailtext: ""}];
    $scope.operatorDataSource = new kendo.data.DataSource({ data: [{id: 1, name:"kleiner"}, {id: 2, name:"kleiner gleich"}, {id: 3, name:"gr\u00f6sser"}, {id: 4, name:"gr\u00f6sser gleich"}, {id: 5, name:"gleich"}, {id: 6, name:"ungleich"}] });
    $scope.thingId = $stateParams.thingId;
    $scope.previousStateTemplate = $stateParams.previousStateTemplate;

    if ($stateParams.templateId) {
        RuleService.getRuleDetails($stateParams.templateId).then(function(res){
            $scope.rules = res.data;
        }, function(error){
            console.log('error during getRuleDetails');
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

        $scope.rules.push({id: max + 1, name:"", istimedriven: false, eventtime: "", csensorid: "", coperatorid:"", cvalue: "", isactionactuator: true, actuatorid:"", actuatorvalue: "", emailto: "", emailtext: ""});
    };

    $scope.removeRule = function(property) {
        var index = $scope.rules.map(function(el) {
            return el.id;
        }).indexOf(property.id);

        $scope.rules.splice(index, 1);
    };

    $scope.submit = function() {
        console.log(JSON.stringify($scope.rules));

        RuleService.createRules($scope.thingId, $scope.rules).then(function(res){
            if($stateParams.previousStateTemplate == true){
                $state.go('Templates');
            }else{
                $state.go('Things');
            }
        }, function(error){
            console.log('error during createRules');
        });
    };
});