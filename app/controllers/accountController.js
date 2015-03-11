wotApp.controller('accountController', function($scope, toaster, TenantService) {
    $scope.tenantId = 1;

    TenantService.getTenantDetails($scope.tenantId).then(function(res){
        $scope.companyname = res.data.name;
        $scope.username = res.data.username;

    }, function(error){
        console.log('error during getTenantDetails');
    });


    // function to submit the form after all validation has occurred
    $scope.submitAccountForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            TenantService.updateCompanyName(2, $scope.companyname).success(function(res) {
                toaster.pop('success', "Changes saved successfully", "");

            }).error(function(err, status) {
                toaster.pop('failure', "Changes could not be saved!", err.error_description);
            });
        }
    };
});