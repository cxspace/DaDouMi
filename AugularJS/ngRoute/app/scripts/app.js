/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp',['ngRoute'])
    .config(function ($routeProvider) {

        $routeProvider

        // route for the contactus page
            .when('/contactus', {
                templateUrl : 'contactus.html',
                controller  : 'ContactController'
            })
            // route for the menu page
            .when('/menu', {
                templateUrl : 'sidebar.html',
                controller  : 'MenuController'
            })
            // route for the dish details page
            .when('/menu/:id', {
                templateUrl : 'dishdetail.html',
                controller  : 'DishDetailController'
            })
            .otherwise('/menu');

});