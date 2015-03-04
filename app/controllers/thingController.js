wotApp.controller('thingController', function($scope, $state, ThingService) {

    $scope.$on("kendoWidgetCreated", function(event, widget){
        if (widget === $scope.thingGrid) {
            $scope.thingGrid.element.on('dblclick', function (e) { $state.go('ThingDetail', { thingId: $scope.selectedItem.id }) });
        }
    });

    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "desc", title: "Description" }
    ];

    $scope.viewThing = function() {
        $state.go('ThingDetail', { thingId: $scope.selectedItem.id });
    };

    ThingService.getThings().then(function(res){
        $scope.gridData = res.data;
    }, function(error){
        console.log('error during getThings');
    });
});