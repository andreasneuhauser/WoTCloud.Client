var wotApp = angular.module('wotApp', ['ui.router', 'ngAnimate', 'toaster', 'angular-loading-bar', 'kendo.directives', 'uiGmapgoogle-maps', 'chart.js']);

wotApp.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)

wotApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

wotApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Home');

    $stateProvider
        .state('Home', {
            url: '/Home',
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .state('Things', {
            url: '/Things',
            templateUrl: 'pages/things.html',
            controller: 'thingController'
        })
        .state('ThingDetail', {
            url: "/Things/:thingId",
            templateUrl: 'pages/thingdetail.html',
            controller: 'thingDetailController'
        })
        .state('SensorDetail', {
            url: "/Things/:thingId/Sensors/:sensorId",
            templateUrl: 'pages/sensordetail.html',
            controller: 'sensorDetailController'
        })
        .state('Account', {
            url: '/Account',
            templateUrl: 'pages/account.html',
            controller: 'accountController'
        })
});

//Add this to have access to a global variable
/*chatApp.run(function ($rootScope) {
 $rootScope.loggedInUsername = ''; //global variable
 });*/

wotApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//Directive for entering chat message
wotApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});