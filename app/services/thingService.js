wotApp.factory('ThingService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getThings = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things');
    };

    srv.getThing = function(thingId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId);
    };

    srv.getThingDetails = function(thingId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/details');
    };

    srv.getSensors = function(thingId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/sensors');
    };

    srv.createThing = function(value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.editThing = function(thingId, value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.deleteThing = function(thingId){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: thingId
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
        deleteThing: function(thingId){
            return srv.deleteThing(thingId);
        }
    };
});