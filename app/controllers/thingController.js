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
        $scope.gridData = res.data;
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
        //$scope.selectedItem.id
        $scope.refresh();
    };

    $scope.refresh = function() {
        ThingService.getThings().then(function(res){
            $scope.gridData = res.data;
        }, function(error){
            console.log('error during getThings');
        });
    };
});