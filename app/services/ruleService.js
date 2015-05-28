wotApp.factory('RuleService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.createRules = function(thingId, value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things/' + thingId + '/rules',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    // Public API
    return {
        createRules: function(thingId, data){
            return srv.createRules(thingId, data);
        }
    };
});