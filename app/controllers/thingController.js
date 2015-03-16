wotApp.controller('thingController', function($scope, $state, ThingService) {
    $scope.$on("kendoWidgetCreated", function(event, widget){
        if (widget === $scope.thingGrid) {
            $scope.thingGrid.element.on('dblclick', function (e) { $state.go('ThingDetail', { thingId: $scope.selectedItem.id }) });
        }
    });

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

    $scope.viewThing = function() {
        $state.go('ThingDetail', { thingId: $scope.selectedItem.id });
    };

    $scope.editThing = function() {
        $state.go('ThingEdit', { thingId: $scope.selectedItem.id });
    };

    $scope.deleteThing = function() {
        ThingService.deleteThing($scope.selectedItem.id).then(function(res){
            $scope.refresh();
        }, function(error){
            console.log('error during getThings');
        });
    };

    $scope.refresh = function() {
        ThingService.getThings().then(function(res){
            $scope.gridData = res.data;
        }, function(error){
            console.log('error during getThings');
        });
    };
});