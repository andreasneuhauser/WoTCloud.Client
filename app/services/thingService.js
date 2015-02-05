wotApp.factory('ThingService', function($http){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net';

    srv.getThings = function(){
        return $http.get(srv._baseUrl + '/api/1/things');
    };

    srv.getSensors = function(thingId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId);
    };

    // Public API
    return {
        getThings: function(){
            return srv.getThings();
        },
        getSensors: function(thingId){
            return srv.getSensors(thingId);
        }
    };
});