wotApp.factory('ActuatorService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getActuator = function(thingId, actuatorId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/actuators/' + actuatorId);
    };

    srv.fireActuator = function(thingId, actuatorId, value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/actuators/' + actuatorId,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    // Public API
    return {
        getActuator: function(thingId, actuatorId){
            return srv.getActuator(thingId, actuatorId);
        },
        fireActuator : function(thingId, actuatorId, value){
            return srv.fireActuator(thingId, actuatorId, value);
        }
    };
});