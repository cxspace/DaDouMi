/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp')

 .controller('MenuController',['$scope', 'menuFactory',function($scope,menuFactory) {


    $scope.tab = 1;
    $scope.showDetails = false;
    $scope.filtText = '';
    $scope.dishes = menuFactory.getDishes();

    $scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2)
        {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3)
        {
            $scope.filtText = "mains";
        }
        else if (setTab === 4)
        {
            $scope.filtText = "dessert";
        }
        else{
            $scope.filtText = "";}

    };

    $scope.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    };

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

.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {

        var dish= menuFactory.getDish(parseInt($routeParams.id,10));

        $scope.dish = dish;

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
;/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp').service('menuFactory',function () {


    var dishes=[
        {
            _id:0,
            name:'Uthapizza',
            image: 'images/uthapizza.png',
            category: 'mains',
            label:'Hot',
            price:'4.99',
            description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
            comment: ''
        },
        {
            _id:1,
            name:'Zucchipakoda',
            image: 'images/zucchipakoda.png',
            category: 'appetizer',
            label:'',
            price:'1.99',
            description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
            comment: ''
        },
        {
            _id:2,
            name:'Vadonut',
            image: 'images/vadonut.png',
            category: 'appetizer',
            label:'New',
            price:'1.99',
            description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
            comment: ''
        },
        {
            _id:3,
            name:'ElaiCheese Cake',
            image: 'images/elaicheesecake.png',
            category: 'dessert',
            label:'',
            price:'2.99',
            description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
            comment: ''
        }
    ];

    this.getDishes = function(){
        return dishes;
    };
    this.getDish = function (index) {
        return dishes[index];
    };

});