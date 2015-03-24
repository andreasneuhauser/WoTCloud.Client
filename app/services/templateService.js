wotApp.factory('TemplateService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getPrivateTemplates = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/templates');
    };

    srv.getPublicTemplates = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/templates/public');
    };

    srv.createTemplate = function(value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/things',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.deleteTemplate = function(templateId){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/templates/' + templateId,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: templateId
        });
    };

    // Public API
    return {
        getPrivateTemplates: function(){
            return srv.getPrivateTemplates();
        },
        getPublicTemplates: function(){
            return srv.getPublicTemplates();
        },
        createTemplate: function(data){
            return srv.createTemplate(data);
        },
        deleteTemplate: function(templateId){
            return srv.deleteTemplate(templateId);
        }
    };
});