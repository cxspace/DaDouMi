/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp').controller('MenuController',['$scope', 'menuFactory',function($scope,menuFactory) {


    $scope.tab = 1;
    $scope.showDetails = false;
    $scope.filtText = '';
    $scope.dishes = menuFactory.getDishes();

    $scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2)
            $scope.filtText = "appetizer";
        else if (setTab === 3)
            $scope.filtText = "mains";
        else if (setTab === 4)
            $scope.filtText = "dessert";
        else
            $scope.filtText = "";

    }

    $scope.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    }

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
        agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function($scope) {

    $scope.sendFeedback = function() {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",agree:false, email:"" };
            $scope.feedback.mychannel="";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };

}]);
