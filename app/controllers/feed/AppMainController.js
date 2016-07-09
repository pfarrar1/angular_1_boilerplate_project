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
