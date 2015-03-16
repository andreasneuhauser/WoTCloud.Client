wotApp.factory('SensorService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getSensor = function(thingId, sensorId){
        return $http.get(srv._baseUrl + thingId + '/sensors/' + sensorId);
    };

    srv.getSensorValues = function(thingId, sensorId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/sensors/' + sensorId + '/data');
    };

    srv.addNewValue = function(thingId, sensorId, value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/sensors/' + sensorId,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.deleteSensor = function(thingId, sensorId){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/sensors/' + sensorId,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: sensorId
        });
    };

    // Public API
    return {
        getSensor: function(thingId, sensorId){
            return srv.getSensor(thingId, sensorId);
        },
        getSensorValues: function(thingId, sensorId){
            return srv.getSensorValues(thingId, sensorId);
        },
        addNewValue : function(thingId, sensorId, value){
            return srv.addNewValue(thingId, sensorId, value);
        },
        deleteSensor : function(thingId, sensorId){
            return srv.deleteSensor(thingId, sensorId);
        }
    };
});