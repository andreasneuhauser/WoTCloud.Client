wotApp.factory('TenantService', function($http){
    var srv = {};

    srv._baseUrl = 'https://sewebchat-secureapi.azurewebsites.net';

    srv.getActiveUsers = function(){
        return $http.get(srv._baseUrl + '/api/User?state=active');
    };

    // Public API
    return {
        getActiveUsers: function(){
            return srv.getActiveUsers();
        }
    };
});