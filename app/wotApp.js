var wotApp = angular.module('wotApp', ['ui.router', 'LocalStorageModule', 'ngAnimate', 'toaster', 'angular-loading-bar', 'kendo.directives', 'uiGmapgoogle-maps', 'chart.js', 'ngMessages']);

wotApp.run(['$rootScope', '$state', '$stateParams', 'authService',
        function ($rootScope, $state, $stateParams, authService) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            authService.fillAuthData();
        }
    ]
);

wotApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

wotApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider
        .state('Home', {
            url: '/Home',
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .state('Login', {
            url: '/Login',
            templateUrl: 'pages/login.html',
            controller: 'loginController'
         })
        .state('Register', {
            url: '/Register',
            templateUrl: 'pages/register.html',
            controller: 'registerController'
        })
        .state('Things', {
            url: '/Things',
            templateUrl: 'pages/things.html',
            controller: 'thingController'
        })
        .state('ThingCreate', {
            url: '/Thing/Create',
            templateUrl: 'pages/thing_create.html',
            controller: 'thingCreateController'
        })
        .state('ThingEdit', {
            url: '/Thing/Edit/:thingId',
            templateUrl: 'pages/thing_edit.html',
            controller: 'thingEditController'
        })
        .state('ThingDetail', {
            url: "/Things/:thingId",
            templateUrl: 'pages/thing_detail.html',
            controller: 'thingDetailController'
        })
        .state('SensorDetail', {
            url: "/Things/:thingId/Sensors/:sensorId",
            templateUrl: 'pages/sensor_detail.html',
            controller: 'sensorDetailController'
        })
        .state('Account', {
            url: '/Account',
            templateUrl: 'pages/account.html',
            controller: 'accountController'
        })
        .state('Templates', {
            url: '/Templates',
            templateUrl: 'pages/templates.html',
            controller: 'templateController'
        })
        .state('TemplateCreate', {
            url: '/Templates/Create?isPublic',
            templateUrl: 'pages/template_create.html',
            controller: 'templateCreateController'
        })
});

wotApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//Directive for entering chat message
wotApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

wotApp.directive('validateMustEqualTo', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (_.isUndefined(attrs.formName)) {
                throw 'For this directive to function correctly you need to supply the form-name attribute';
            }

            function isEqualToOther(value) {
                var otherInput = scope[attrs.formName][attrs.validateMustEqualTo];
                if (_.isUndefined(otherInput)) {
                    throw 'Cannot retrieve the second field to compare with from the scope';
                }

                var otherValue = otherInput.$modelValue || otherInput.$viewValue;
                if (otherInput.$untouched || _.isEmpty(otherValue)) {
                    return true;
                }

                var isEqual = (value === otherValue);

                otherInput.$setValidity('notEqualTo', isEqual);

                return isEqual;
            }

            ngModel.$validators.notEqualTo = function (modelValue, viewValue) {
                var value = modelValue || viewValue;

                return isEqualToOther(value);
            };
        }
    };
});