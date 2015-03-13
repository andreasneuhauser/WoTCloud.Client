wotApp.factory('ThingService', function($http){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net';

    srv.getThings = function(){
        return $http.get(srv._baseUrl + '/api/1/things');
    };

    srv.getThing = function(thingId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId);
    };

    srv.getThingDetails = function(thingId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId + '/details');
    };

    srv.getSensors = function(thingId){
        return $http.get(srv._baseUrl + '/api/1/things/' + thingId + '/sensors');
    };

    srv.createThing = function(value){
        return $http({
            url: srv._baseUrl + '/api/1/things',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.editThing = function(thingId, value){
        return $http({
            url: srv._baseUrl + '/api/1/things/' + thingId,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.deleteThing = function(value){
        return $http({
            url: srv._baseUrl + '/api/1/things',
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    // Public API
    return {
        getThings: function(){
            return srv.getThings();
        },
        getThing: function(thingId){
            return srv.getThing(thingId);
        },
        getThingDetails: function(thingId){
            return srv.getThingDetails(thingId);
        },
        getSensors: function(thingId){
            return srv.getSensors(thingId);
        },
        createThing: function(data){
            return srv.createThing(data);
        },
        editThing: function(thingId, data){
            return srv.editThing(thingId, data);
        },
        deleteThing: function(data){
            return srv.deleteThing(data);
        }
    };
});