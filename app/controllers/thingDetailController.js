wotApp.controller('thingDetailController', ['$scope', '$stateParams', 'ThingService', function($scope, $stateParams, ThingService) {

    $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 6 };
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 40.1451,
            longitude: -99.6680
        }
    };

    $scope.thingId = $stateParams.thingId;

    $scope.gridColumns = [
        { field: "id", title: "ID" },
        { field: "name", title: "Name" },
        { field: "group", title: "Group" }
    ];

    ThingService.getSensors($scope.thingId).then(function(res){
        var dataSource = new kendo.data.DataSource({
            data: res.data,
            group: { field: "group" }});
        $scope.gridData = dataSource;
    }, function(error){
        console.log('error during getSensors');
    });
}]);