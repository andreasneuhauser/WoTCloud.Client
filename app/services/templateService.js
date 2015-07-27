/**
 * The `TemplateService` service allows CRUD operations for Templates
 */
wotApp.factory('TemplateService', function($http, localStorageService){
    var srv = {};

    srv._baseUrl = 'https://wotcloud.azurewebsites.net/api/';

    srv.getTemplates = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/templates');
    };

    srv.getPrivateTemplates = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/templates/private');
    };

    srv.getPublicTemplates = function(){
        return $http.get(srv._baseUrl + localStorageService.get('tenant_id') + '/templates/public');
    };

    srv.createPrivateTemplate = function(value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/templates/private',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: value
        });
    };

    srv.createPublicTemplate = function(value){
        return $http({
            url: srv._baseUrl + localStorageService.get('tenant_id') + '/templates/public',
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
        getTemplates: function(){
            return srv.getTemplates();
        },
        getPrivateTemplates: function(){
            return srv.getPrivateTemplates();
        },
        getPublicTemplates: function(){
            return srv.getPublicTemplates();
        },
        createPrivateTemplate: function(data){
            return srv.createPrivateTemplate(data);
        },
        createPublicTemplate: function(data){
            return srv.createPublicTemplate(data);
        },
        deleteTemplate: function(templateId){
            return srv.deleteTemplate(templateId);
        }
    };
});