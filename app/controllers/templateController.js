wotApp.controller('templateController', function($scope, $state, ThingService) {
    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "description", title: "Description" }
    ];

    ThingService.getThings().then(function(res){
        $scope.gridData = new kendo.data.DataSource({
            data: res.data,
            pageSize: 15});
    }, function(error){
        console.log('error during getThings');
    });

    $scope.addPrivateTemplate = function() {
        $state.go('TemplateCreate', { isPublic: false });
    };

    $scope.addPublicTemplate = function() {
        $state.go('TemplateCreate', { isPublic: true });
    };

    $scope.deleteThing = function() {
        ThingService.deleteThing($scope.selectedItem.id).then(function(res){
            $scope.refresh();
        }, function(error){
            console.log('error during getThings');
        });
    };

    /*$scope.refresh = function() {
        ThingService.getThings().then(function(res){
            $scope.gridData = res.data;
        }, function(error){
            console.log('error during getThings');
        });
    };*/
});