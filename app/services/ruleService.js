wotApp.factory('RuleService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getRules = function(thingId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/rules');
    };

    srv.getRuleDetails = function(thingId){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/rules/details');
    };

    srv.createRules = function(thingId, value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/rules',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.deleteRule = function(thingId, ruleId){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/rules/' + ruleId,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: ruleId
        });
    };

    // Public API
    return {
        getRules: function(thingId){
            return srv.getRules(thingId);
        },
        getRuleDetails: function(thingId){
            return srv.getRuleDetails(thingId);
        },
        createRules: function(thingId, data){
            return srv.createRules(thingId, data);
        },
        deleteRule: function(thingId, ruleId){
            return srv.deleteRule(thingId, ruleId);
        },
    };
});