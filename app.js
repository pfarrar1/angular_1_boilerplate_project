(function() {
    'use strict';
    angular.module('boilerplate', ['ngRoute', 'ngResource', 'ui.bootstrap', 'AppConfig'])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/views/home/_dashboard.html',
                    })
                    .when('/new', {
                        templateUrl: 'app/views/home/_new.html',
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ])
        .run(['$rootScope', '$location',
            function($rootScope, $location) {
                $rootScope.environment = {
                    debug: false,
                    appName: "Angular boilerplate",
                    browser: navigator.appVersion,
                    hostname: window.location.hostname,
                    nav: [{
                        name: "Test",
                        uri: '#test',
                    }]
                };
            }
        ]);

    angular.module('AppConfig', [])
        .provider('AppConfig', function() {
            var config = {
                headers: {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            };
            return {
                set: function(settings) {
                    config = settings;
                },
                $get: function() {
                    return config;
                }
            };
        });

})();
