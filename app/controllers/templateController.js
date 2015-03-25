wotApp.controller('templateController', function($scope, $state, TemplateService) {
    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "description", title: "Description" }
    ];

    TemplateService.getPrivateTemplates().then(function(res){
        $scope.privateData = new kendo.data.DataSource({
            data: res.data,
            pageSize: 15});
    }, function(error){
        console.log('error during getPrivateTemplates');
    });

    TemplateService.getPublicTemplates().then(function(res){
        $scope.publicData = new kendo.data.DataSource({
            data: res.data,
            pageSize: 15});
    }, function(error){
        console.log('error during getPublicTemplates');
    });

    $scope.deletePublicTemplate = function() {
        TemplateService.deletePublicTemplate($scope.selectedPublicItem.id).then(function(res){
            $scope.refreshPublic();
        }, function(error){
            console.log('error during deletePublicTemplate');
        });
    };

    $scope.deletePrivateTemplate = function() {
        TemplateService.deletePrivateTemplate($scope.selectedPrivateItem.id).then(function(res){
            $scope.refreshPrivate();
        }, function(error){
            console.log('error during deletePrivateTemplate');
        });
    };
});