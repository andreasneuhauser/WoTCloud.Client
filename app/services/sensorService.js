wotApp.factory('SensorService', function($http){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net';

    srv.getValues = function(){
        return $http.get(srv._baseUrl + '/api/1/things/1/sensors/1');
    };

    // Public API
    return {
        getValues: function(){
            return srv.getValues();
        }
    };
});