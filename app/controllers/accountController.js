wotApp.controller('accountController', function($scope, toaster) {

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            toaster.pop('success', "Changes saved successfully", "");
        }
    };
});