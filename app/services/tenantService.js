wotApp.factory('TenantService', function($http){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net';

    srv.getTenantDetails = function(tenantId){
        return $http.get(srv._baseUrl + '/api/tenants/' + tenantId);
    };

    // Public API
    return {
        getTenantDetails: function(tenantId){
            return srv.getTenantDetails(tenantId);
        }
    };
});