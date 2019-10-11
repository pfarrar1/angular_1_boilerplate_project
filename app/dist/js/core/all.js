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

(function() {
    'use strict';

    angular.module('boilerplate').controller('AppMainController', ['$rootScope', '$scope', 'dataService', '$location', '$anchorScroll',
        function($rootScope, $scope, dataService, $location, $anchorScroll) {

            function init(type) {

                $scope.pageHeading = "This is the first View"
                //Load Initial Data Set
                dataService.getData().then(
                    function(data) {
                        //Limit to Past Years Data - 2 years
                        $rootScope.data = dataService.filterByDate(data, 2);
                        // Extract Restauraunt Data
                        $scope.restauraunts = dataService.transformRawRestaurantData($rootScope.data);
                    },
                    function(error) {

                    })
            };

            init();

            $scope.select = function(data) {
                $scope.selectedRestaurant = data;
                $anchorScroll();
            }

        }
    ]);

})();

// Example Service Getting data from open API

(function() {
    'use strict';

    angular.module('boilerplate').factory('dataService', ['$q', '$http', 'AppConfig',
        function($q, $http, AppConfig) {

            return {
                getData: getData,
                transformRawRestaurantData: transformRawRestaurantData,
                filterByDate: filterByDate
            };

            function getData() {
                var deferred = $q.defer();
                var url = "https://data.cityofchicago.org/resource/cwig-ma7x.json";

                $http.get(url).then(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                    },
                    function(data, status, headers, config) {
                        deferred.reject(status);
                    })
                return deferred.promise;
            }

            function transformRawRestaurantData(dataset) {
                // Extract Restauraunt Data
                var restaurauntsRaw = _.where(dataset, { facility_type: "Restaurant" });
                // Restauraunt Passing Inspections
                var passingRestaurants = _.where(restaurauntsRaw, { results: "Pass" });
                // Restauraunt Failing Inspections
                var failRestaurants = _.where(restaurauntsRaw, { results: "Fail" });
                // Restauraunt By Risk Type Inspections
                var restaurantsByRiskType = _.countBy(restaurauntsRaw, 'risk');

                var restaurantsByZip = _.countBy(restaurauntsRaw, 'zip');

                var restaurantsByRiskTypeArray = _.map(restaurantsByRiskType, function(value, key) {
                    return {
                        name: key,
                        count: value
                    };
                });

                var restaurantsByZipByHighRiskType = _.countBy(_.where(restaurauntsRaw, { risk: restaurantsByRiskTypeArray[0].name }), 'zip');
                var restaurantsByZipByMediumRiskType = _.countBy(_.where(restaurauntsRaw, { risk: restaurantsByRiskTypeArray[1].name }), 'zip');
                var restaurantsByZipByLowRiskType = _.countBy(_.where(restaurauntsRaw, { risk: restaurantsByRiskTypeArray[2].name }), 'zip');

                //Build data object
                var data = {
                    entries: restaurauntsRaw,
                    passingRestaurants: {
                        entries: passingRestaurants,
                        count: passingRestaurants.length
                    },
                    failRestaurants: {
                        entries: failRestaurants,
                        count: failRestaurants.length
                    },
                    localeInfo: {
                        restaurantsByRiskType: restaurantsByRiskTypeArray,
                        restaurantsByZip: restaurantsByZip,
                        restaurantsByZipByHighRiskType: restaurantsByZipByHighRiskType,
                        restaurantsByZipByMediumRiskType: restaurantsByZipByMediumRiskType,
                        restaurantsByZipByLowRiskType: restaurantsByZipByLowRiskType
                    }
                }

                // console.log("restaurantData", data);

                return data;
            }

            function filterByDate(data, numberOfYears) {
                var container = [];
                var roundedYears = Math.round(numberOfYears);
                // if rounded years rounds down to 0 pass value of 1 year
                if (roundedYears == 0) { roundedYears = 1 };

                // iterrate through data and only return itens with date range
                _.each(data, function(i) {
                    if (i.inspection_date && (moment().subtract(roundedYears, 'years').isBefore(i.inspection_date))) {
                        container.push(i);
                    }
                })
                return container;
            }
        }
    ]);
})();
