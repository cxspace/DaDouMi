/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp').controller('MenuController',['$scope', 'menuFactory',function($scope,menuFactory) {

    $scope.showDetails = false;

    $scope.dishes = menuFactory.getDishes();


    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

}]);
