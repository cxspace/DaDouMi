# Exercise (Instructions): Setting up the Ionic Framework

### Objectives and Outcomes

In this exercise you will set up the Ionic framework and Cordova on your computer. Thereafter you will scaffold out an Ionic application. At the end of this exercise, you will be able to:

- Set up the Ionic framework and Cordova on your machine
- Scaffold out an Ionic application using one of the starter templates in Ionic.

### Preconfiguration of your computer

- Make sure that you have installed [node](http://nodejs.org/), [gulp](http://gulpjs.com/) and [bower](http://bower.io/) on your computer. If you have taken the previous courses in this specialization, you must have already set them up by now.

### Setting up the Ionic Framework

- To install the Ionic framework, at the prompt type:

```
npm install cordova ionic -g
```

 you are installing on OSX or Linux, make sure to precede with sudo.

### Creating an Ionic Project

- Go to a convenient location on your computer and create a folder named *Ionic*. Then move to that folder in the command window.
- To scaffold out a new Ionic project, type the following at the command prompt:

```
ionic start conFusion --type=ionic1 sidemenu
```

- Move to the *conFusion* folder and examine the contents.
- To see the resulting project in your browser, type the following at the command prompt:

```
ionic serve
```

### Conclusions

In this exercise, you installed Cordova and Ionic on your computer. Then you used Ionic to scaffold out a new Ionic application.

# Exercise (Instructions): Ionic and AngularJS

### Objectives and Outcomes

In this exercise you will modify the Ionic app that you scaffolded out in the previous Ionic exercise in order to start building the Ionic app for the conFusion restaurant. Along the way you will learn about Ionic CSS classes and Ionic's use of AngularJS directives. At the end of this exercise, you will be able to:

- Modify a scaffolded application to develop your own application
- Learn more about Ionic's CSS and AngularJS support.

### Developing the conFusion App

- Open the conFusion app that you scaffolded out in the previous exercise, using a text editor of your choice. You will now explore some of the files in this project. Open the *index.html* file in the *www* folder.
- Modify the body tag in the file as shown below:

```

     <body ng-app="conFusion">

```

- Next, open the app.js file and modify the following line of code as shown below:

```
angular.module('conFusion', ['ionic', 'conFusion.controllers'])
```

- Open the *controller.js* file and modify the following line of code as follows:

```
angular.module('conFusion.controllers', [])
```

### Updating the Sidebar

- Rename the *menu.html* file as *sidebar.html* file and then open it.
- Update the contents of the sidebar.html file as follows:

```
<ion-side-menus enable-menu-with-back-views="false">
  <ion-side-menu-content>
    <ion-nav-bar class="bar-royal">
      <ion-nav-back-button>
      </ion-nav-back-button>
      <ion-nav-buttons side="left">
        <button class="button button-icon button-clear ion-navicon" menu-toggle="left">
        </button>
      </ion-nav-buttons>
    </ion-nav-bar>
    <ion-nav-view name="mainContent"></ion-nav-view>
  </ion-side-menu-content>
  <ion-side-menu side="left">
    <ion-header-bar class="bar-positive">
      <h1 class="title">Navigation</h1>
    </ion-header-bar>
    <ion-content>
      <ion-list>
        <ion-item menu-close href="#/app/home">
          Home
        </ion-item>
        <ion-item menu-close href="#/app/aboutus">
          About Us
        </ion-item>
        <ion-item menu-close href="#/app/menu">
          Menu
        </ion-item>
        <ion-item menu-close href="#/app/contactus">
          Contact Us
        </ion-item>
        <ion-item class="item-divider">
          Services
        </ion-item>
        <ion-item menu-close ng-click="login()">
          Login
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-side-menu>
</ion-side-menus>
```

- Save the file and switch to *app.js* file.

### Updating the UI-Router

- Update the config in the *app.js* file as follows:

```
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html'
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html'
        }
      }
    })

    .state('app.menu', {
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: ''
        }
      }
    })

  .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: ''
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
```

- Now, rename *search.html* to *home.html*. Then, update its contents as follows:

```
<ion-view view-title="Ristorante con Fusion">
  <ion-content>
    <h1>Ristorante con Fusion</h1>
  </ion-content>
</ion-view>
```

- Then, rename *browse.html* to *aboutus.html.* Then update its contents as follows:

```
<ion-view view-title="About Us">
  <ion-content>
    <h1>About Us</h1>
  </ion-content>
</ion-view>
```

- Next, rename *playlists.html* to *menu.html*. Then update its contents as follows:

```
<ion-view view-title="Menu">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="dish in Dishes" href="#/app/menu/{{dish.id}}">
        {{dish.name}}
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
```

- Finally, rename *playlist.html* to *dishdetail.html*. Then update its contents as follows:

```
<ion-view view-title="Dish Details">
  <ion-content>
    <h1>Dish Details</h1>
  </ion-content>
</ion-view>
```

- Next, create a new file named *contactus.html* and paste the following into the file:

```
<ion-view view-title="Contact Us">
  <ion-content>
    <h1>Contact Us</h1>
  </ion-content>
</ion-view>
```

- After making these changes, start the ionic server by typing the following at the prompt:

```
ionic serve --lab
```

### Conclusions

In this exercise, you updated the scaffolded application to move it closer to the conFusion app that we wish to develop for our restaurant example.

# Exercise (Instructions): Exploring Ionic Part 1

### Exercise Resources

https://d3c33hcgiwev3.cloudfront.net/_e72924babd754e471ac8c34a51b1ae34_services.js

```
'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var promotions = [
                {
                          _id:0,
                          name:'Weekend Grand Buffet', 
                          image: 'images/buffet.png',
                          label:'New',
                          price:'19.99',
                          description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
                }
                
            ];
    
                this.getDishes = function(){
                    
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                    
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function() {
                    return   $resource(baseURL+"promotions/:id");;
                }
    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+"leadership/:id");
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+"feedback/:id");
    
        }])

;
```

https://d3c33hcgiwev3.cloudfront.net/_0741efc46f41f4413aaeacc838c50e7e_controllers.js

```
'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
                                        
                        $scope.leader = corporateFactory.get({id:3});
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        $scope.promotion = menuFactory.getPromotion().get({id:0});
            
                    }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
                    $scope.leaders = corporateFactory.query();
                    console.log($scope.leaders);
            
                    }])

;
```

### Objectives and Outcomes

In this exercise, we will continue to port the AngularJS app that we developed in the previous AngularJS course to an Ionic app. Along the way we will learn more about Ionic framework. At the end of this exercise, you will be able to:

- Set up the controllers, services and communicating with the server to enable the construction of an Ionic app
- Design templates for the Ionic app using Ionic's Angular directives

**Note: Make sure that your json-server is up and running**

### Updating the conFusion App

- Download the *services.js* file provided above to your *www/js* folder of your Ionic project.

### Updating services.js

- Open *services.js* and update the angular.module as follows:

```
angular.module('conFusion.services', ['ngResource'])
```

- Save the changes.

### Updating index.html

- Open index.html file to import ngResource by adding the following after the statement that imports the Ionic bundle:

```
    <script src="lib/ionic/js/angular/angular-resource.min.js"></script>
```

- Then, import services.js after you import the controllers.js file as follows:

```
    <script src="js/services.js"></script>
```

- Save the changes.

### Updating app.js

- Open app.js and then inject the conFusion.services into the Angular module as follows:

```
angular.module('conFusion', ['ionic', 'conFusion.controllers','conFusion.services'])
```

- Save the changes.

### Updating controllers.js

- Before you proceed forward, download the *controllers.js* file that we provide above. This is the controller code from the AngularJS application that you developed in the previous course. From this file, copy only the code corresponding to the controllers. You will paste this code into the *controllers.js* file for our Ionic app.
- Open the controllers.js file of our Ionic app to start updating the controllers. In this file, replace the PlayListsCtrl and PlayListCtrl controller code with the code you copied in the step above. Now we have moved all the controller code from the previous course into our Ionic app.

### Updating home.html

- Start Ionic serve by typing the following at the prompt in your command window/terminal while in the application folder:

```
     ionic serve --lab
```

- Open *home.html*, and update it as follows and save:

```
<ion-view view-title="Ristorante con Fusion">
  <ion-content>
    <div class="card">
        <div class="item item-divider">
            Our Lipsmacking Culinary Creations
            <span class="badge badge-assertive">{{dish.label}}</span>
        </div>
        <div class="item item-thumbnail-left item-text-wrap">
            <img ng-src="{{baseURL+dish.image}}" alt="Uthappizza">
            <h2>{{dish.name}}
             <span class="badge">{{dish.price | currency}}</span></h2>
            <p>{{dish.description}}</p>
        </div>
    </div>
  </ion-content>
</ion-view>
```

- When we see the updates in the browser, it shows a card structure, but the content is blank. You need to fix the controller and app configuration.
- Open *app.js* and update the app.home state to introduce the IndexController to the state as follows and save the changes:

```
  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
          controller: 'IndexController'
      }
    }
  })
```

- Then, open *controllers.js* file and update the IndexController as follows and save the changes:

```
 .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'baseURL', function($scope, menuFactory, corporateFactory, baseURL) {

                        $scope.baseURL = baseURL;
                        $scope.leader = corporateFactory.get({id:3});
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        $scope.promotion = menuFactory.getPromotion().get({id:0});
      }])
```

- The app should now correctly display the information about the featured dish.
- Next, update the *home.html* page by adding two more cards for the promotions and the executive chef. You can add the following code to the *home.html* page and save the changes:

```
 <div class="card">
          <div class="item item-divider">
            This Month's Promotions
            <span class="badge badge-assertive">{{promotion.label}}</span>
          </div>
          <div class="item item-thumbnail-left item-text-wrap">
               <img ng-src="{{baseURL+promotion.image}}" alt="{{promotion.name}}">
                <h2>{{promotion.name}}
                 <span class="badge">{{promotion.price | currency}}</span></h2>
                <p>{{promotion.description}}</p>
          </div>
      </div>
      <div class="card">
          <div class="item item-divider">
            Meet our Culinary Specialists
          </div>
          <div class="item item-thumbnail-left item-text-wrap">
               <img ng-src="{{baseURL+leader.image}}" alt="{{leader.name}}">
                <h2>{{leader.name}}</h2>
                <h4>{{leader.designation}}</h4>
                <p>{{leader.description}}</p>
          </div>
      </div>
```

- See the result in the browser to see how the home page now displays the three cards.

### Conclusions

In this exercise, you explored some more features of the Ionic platform. You were able to port much of the controller and services code from the Angular application with minor changes. Then you designed the home page with three cards using Ionic's CSS classes and Angular directives.

# Exercise (Instructions): Exploring Ionic Part 2

### Objectives and Outcomes

In this exercise you will explore Ionic lists, tabs and Ionic grid and how we can use them in constructing templates. At the end of this exercise, you will be able to:

- Use Ionic lists to construct and display a list of items in your UI
- Use basic tab functionality together with Angular filter to filter and display information in your UI.
- Use the Ionic grid to display content in your UI.

### Updating Controllers

- Open *controllers.js* and update the MenuController as follows and save the changes:

```
 .controller('MenuController', ['$scope', 'menuFactory', 'baseURL', function($scope, menuFactory, baseURL) {

            $scope.baseURL = baseURL;
```

- Then, update the DishDetailController as follows and save the changes:

```
.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', 'baseURL', function($scope, $stateParams, menuFactory, baseURL) {
            $scope.baseURL = baseURL;
```

- Now open *app.js* file and introduce the two controllers that we updated above into the appropriate states:

```
.state('app.menu', {
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuController'
        }
      }
    })

  .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController'
      }
    }
  });
```

### Updating menu.html

- Next update the *menu.html* page as follows and save the changes:

```
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="dish in dishes | filter:{category: filtText}" href="#/app/menu/{{dish.id}}" class="item-thumbnail-left">
        <img ng-src="{{baseURL+dish.image}}">
        <h2>{{dish.name}}
         <span style="font-size:75%">{{dish.price | currency}}</span>
        <span class="badge badge-assertive">{{dish.label}}</span></h2>
        <p>{{dish.description}}</p>
      </ion-item>
    </ion-list>
  </ion-content>
```

- Next we'll add some basic tabs into Ionic to help us filter the list of dishes in the menu. To do this, add the following code to the menu.html page just before the <ion-content> tag and save the changes:

```
   <div class="tabs-striped tabs-color-royal">
    <ul class="tabs">
        <li ng-class="{active:isSelected(1)}" class="tab-item">
            <a ng-click="select(1)">The Menu</a></li>
        <li ng-class="{active:isSelected(2)}" class="tab-item">
            <a ng-click="select(2)">Appetizers</a></li>
        <li ng-class="{active:isSelected(3)}" class="tab-item">
            <a ng-click="select(3)">Mains</a></li>
        <li ng-class="{active:isSelected(4)}" class="tab-item">
            <a  ng-click="select(4)">Desserts</a></li>
    </ul>
  </div>
```

- You can check the resulting page in the browser.

### Updating dishdetail.html

- Open *dishdetail.html* page and update the content as follows and save the changes:

```
<ion-view view-title="Dish Details">
  <ion-content>
      <div class="card">
          <div class="item item-body item-text-wrap">
               <img class="full-image" ng-src="{{baseURL+dish.image}}" alt="Uthappizza">
                <h2>{{dish.name}}
                 <span style="font-size:75%">{{dish.price | currency}}</span>
                <span class="badge badge-assertive">{{dish.label}}</span></h2>
                <p>{{dish.description}}</p>
          </div>
      </div>
  </ion-content>
</ion-view>

```

- Next, we'll add the contents to the *dishdetail.html* page as follows below the card <div> and save the changes:

```
  <div class="row">
            <div class="col col-offset-10">
                   <h4>Customer Comments &nbsp;&nbsp;&nbsp;
                       <small>Sort by: &nbsp;
                             <input type="text" ng-model="orderText">
                          </small></h4>
                    <ul class="list">
                        <li ng-repeat="comment in dish.comments | orderBy:orderText">
                          <blockquote>
                             <p>{{comment.rating}} Stars</p>
                             <p>{{comment.comment}}</p>
                             <footer>{{comment.author}}, {{comment.date | date:'MMM. dd, yyyy'}}</footer>
                          </blockquote>
                        </li>
                    </ul>
            </div>
      </div>
```

- Note the use of row and col classes above illustrating the use of Ionic grid.
- Save the changes and take a look at the update app.

### Conclusions

In this exercise we explored the use of Ionic lists, tabs and the grid in formatting and displaying information in the UI of our app