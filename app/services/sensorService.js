wotApp.factory('SensorService', function($http){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net';

    srv.getSensor = function(thingId, sensorId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId + '/sensors/' + sensorId);
    };

    srv.getSensorValues = function(thingId, sensorId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId + '/sensors/' + sensorId + '/data');
    };

    // Public API
    return {
        getSensor: function(thingId, sensorId){
            return srv.getSensor(thingId, sensorId);
        },
        getSensorValues: function(thingId, sensorId){
            return srv.getSensorValues(thingId, sensorId);
        }
    };
});