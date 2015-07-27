wotApp.factory('TenantService', function($http){
    var srv = {};

    srv._baseUrl = 'http://wotcloud.azurewebsites.net';

    srv.getTenantDetails = function(tenantId){
        return $http.get(srv._baseUrl + '/api/tenants/' + tenantId);
    };

    srv.updateCompanyName = function(tenantId, companyName) {
        return $http.put(srv._baseUrl + '/api/tenants/' + tenantId + '/name', { companyName : companyName }, { headers: { 'Content-Type': 'application/json' } });
    };
    // Public API
    return {
        getTenantDetails: function(tenantId){
            return srv.getTenantDetails(tenantId);
        },
        updateCompanyName: function(tenantId, companyName){
            return srv.updateCompanyName(tenantId, companyName);
        }
    };
});