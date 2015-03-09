wotApp.controller('accountController', function($scope, toaster, TenantService) {

    $scope.tenantId = 1;

    TenantService.getTenantDetails($scope.tenantId).then(function(res){
        $scope.companyname = res.data.name;
        $scope.username = res.data.username;

    }, function(error){
        console.log('error during getTenantDetails');
    });

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            toaster.pop('success', "Changes saved successfully", "");
        }
    };
});