wotApp.controller('thingController', function($scope, ThingService) {

    $scope.$on("kendoWidgetCreated", function(event, widget){
        if (widget === $scope.thingGrid) {
            $scope.thingGrid.element.on('dblclick', function (e) {console.log(e)});
        }
    });

    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "desc", title: "Description" }
    ];

    ThingService.getThings().then(function(res){
        $scope.gridData = res.data;
    }, function(error){
        console.log('error during getThings');
    });
});