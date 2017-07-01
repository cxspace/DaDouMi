'use strict';

var app = angular.module('confusionApp',[]);

app.controller('ContactController', ['$scope', function($scope) {

     $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
     var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
     $scope.channels = channels;
     $scope.invalidChannelSelection = false;

}]);

app.controller('FeedbackController', ['$scope', function($scope) {

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
