# Exercise (Instructions): Ionic Lists: Advanced Features Part 1

### Objectives and Outcomes

In this exercise, you will explore some of the advanced features supported by Ionic lists. In particular you will see how the option buttons of Ionic lists can be used to initiate action upon the user swiping a list item and clicking the option button. At the end of this exercise, you will be able to:

- Configure an Ionic list to display option buttons when the user swipes a list item
- Initiate an action when the user touches on the option button.

### Using Ionic List Option Buttons

- Open *menu.html* and update the Ionic list item as follows:

```
      <ion-item ng-repeat="dish in dishes | filter:{category: filtText}" href="#/app/menu/{{dish.id}}" class="item-thumbnail-left">
        <img ng-src="{{baseURL+dish.image}}">
        <h2>{{dish.name}}
         <span style="font-size:75%">{{dish.price | currency}}</span>
        <span class="badge badge-assertive">{{dish.label}}</span></h2>
        <p>{{dish.description}}</p>
        <ion-option-button class="button-assertive icon ion-plus-circled"
            ng-click="addFavorite({{dish.id}})">
        </ion-option-button>
      </ion-item>
```

### Updating MenuController

- Open controllers.js and update the MenuController declaration as follows:

```
.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {
```

- Thereafter, add the following function to the MenuController:

```
    $scope.addFavorite = function (index) {
        console.log("index is " + index);
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();
    }
```

### Adding favoriteFactory

- Open services.js and add the favoriteFactory to it as follows:

```
.factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var favFac = {};
    var favorites = [];

    favFac.addToFavorites = function (index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id === index)
                return;
        }
        favorites.push({id: index});
    };

    return favFac;
    }])
```

- Save and test the application.

### Conclusions

In this exercise, you made use of the option buttons supported by Ionic lists to enable users to add menu items to their favorites.

# Exercise (Instructions): Ionic Lists: Advanced Features Part 2

### Objectives and Outcomes

In this exercise, you will continue exploring the advanced features of Ionic lists. In particular you will learn about using the delete feature, and also implement a custom Angular filter. At the end of this exercise, you will be able to:

- Use the delete button feature of Ionic lists
- Design and implement a custom Angular filter

### Updating favoriteFactory

- Open *services.js* and update favoriteFactory by add two more functions as follows:

```
    favFac.deleteFromFavorites = function (index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {
                favorites.splice(i, 1);
            }
        }
    }

    favFac.getFavorites = function () {
        return favorites;
    };
```

### Creating favorites.html Template

- In the templates folder, create a new file named favorites.html, and add the following code into the file:

```
<ion-view view-title="My Favorites">
    <ion-nav-buttons side="secondary">
      <div class="buttons">
        <button class="button button-icon icon ion-ios-minus-outline"
          ng-click="toggleDelete()"></button>
      </div>
    </ion-nav-buttons>
  <ion-content>
    <ion-list show-delete="shouldShowDelete">
      <ion-item ng-repeat="dish in dishes | favoriteFilter:favorites" href="#/app/menu/{{dish.id}}" class="item-thumbnail-left" on-swipe-left="deleteFavorite(dish.id)">
        <img ng-src="{{baseURL+dish.image}}">
        <h2>{{dish.name}}
         <span style="font-size:75%">{{dish.price | currency}}</span>
        <span class="badge badge-assertive">{{dish.label}}</span></h2>
        <p>{{dish.description}}</p>
        <ion-delete-button class="ion-minus-circled"
          ng-click="deleteFavorite(dish.id)">
        </ion-delete-button>
      </ion-item>
    </ion-list>
  </ion-content>
 </ion-view>
```

### Updating app.js

- Open app.js, and add the new state into the config there as follows:

```
   .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController'
        }
      }
    })
```

### Adding FavoritesController

- Open controllers.js and add FavoritesController as follows:

```
.controller('FavoritesController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favorites = favoriteFactory.getFavorites();

    $scope.dishes = menuFactory.getDishes().query(
        function (response) {
            $scope.dishes = response;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    console.log($scope.dishes, $scope.favorites);

    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }

    $scope.deleteFavorite = function (index) {
        
        favoriteFactory.deleteFromFavorites(index);
        $scope.shouldShowDelete = false;

    }}])

```

### Implementing favoriteFilter

- Open controllers.js and add the filter as shown below:

```
.filter('favoriteFilter', function () {
    return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;

    }});

```

### Updating sidebar.html

- Add the following new item into the list in sidebar.html to add the "My Favorites" option there:

```
        <ion-item menu-close href="#/app/favorites">
          My Favorites
        </ion-item>
 
```

- Save all the changes and examine the updated app.

### Conclusions

In this exercise, you explored the use of the delete button and also learnt about implementing a custom Angular filter.



# Exercise (Instructions): Popups, Loading, Spinner and Gestures

### Objectives and Outcomes

In this exercise you will use popups, loading messages and gestures within your application. Popups will be used for confirmation, loading message will be displayed while the app is communicating with a server, and a swipe gesture will be supported. At the end of this exercise, you will be able to:

- Use popups to show messages to the users for confirmation
- Use a loading message together with a spinner to show the user while the app is downloading information from a server
- Use gestures within your app.

### Updating FavoritesController

- Open *controllers.js* and in the *FavoriteController*, update the *deleteFavorite* function as follows:

```
    $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.deleteFromFavorites(index);
            } else {
                console.log('Canceled delete');
            }
        });

        $scope.shouldShowDelete = false;

    }
```

- Then, update the FavoritesController definition as follows:

```
.controller('FavoritesController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {
```

- Then, update the FavoritesController code as follows:

```
    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading...'
    });

    $scope.favorites = favoriteFactory.getFavorites();

    $scope.dishes = menuFactory.getDishes().query(
        function (response) {
            $scope.dishes = response;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        });
```

### Updating favorites.html to use Gesture

- Open *favorites.html* and update the *<ion-item>* tag as follows:

```
      <ion-item ng-repeat="dish in dishes | favoriteFilter:favorites" href="#/app/menu/{{dish.id}}" class="item-thumbnail-left" on-swipe-left="deleteFavorite(dish.id)">
```

- Save all the changes and then check the resulting application

### Conclusions

In this exercise, you have seen the use of popups, loading message, spinners and gestures within an Ionic application.

# Exercise (Instructions): Angular ui-router and Resolve

### Objectives and Outcomes

In this exercise you will use resolve in ui-router to simplify the code within your controllers. At the end of this exercise, you will be able to:

- Use the resolve object to resolve the dependencies in the state
- Inject the data after resolution into the controller

### Updating services.js

- Open *services.js* and update the menuFactory and also introduce a promotionFactory as follows:

```
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "promotions/:id");

}])
```

### Updating controllers.js

- In *controllers.js* replace all occurrences of menuFactory.getDishes() with just menuFactory.
- In addition, update the IndexController as follows

```
.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leader = corporateFactory.get({
        id: 3
    });

    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.promotion = promotionFactory.get({
        id: 0
    });

}])
```

### Updating app.js to use resolve

- Open *app.js* and update the app.favorites and app.dishdetail states as follows:

```
   .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController',
          resolve: {
              dishes:  ['menuFactory', function(menuFactory){
                return menuFactory.query();
              }],
                            favorites: ['favoriteFactory', function(favoriteFactory) {
                  return favoriteFactory.getFavorites();
              }]
          }
        }
      }
    })

  .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController',
        resolve: {
            dish: ['$stateParams','menuFactory', function($stateParams, menuFactory){
                return menuFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  });
```

### Update controllers.js

- Open *controllers.js* and update FavoritesController as follows:

```
.controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favorites = favorites;

    $scope.dishes = dishes;

    . . .

}])

```

- Similarly, update DishDetailController as follows:

```
.controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', function ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal) {

    $scope.baseURL = baseURL;

    $scope.dish = dish;

    . . .

}])
```

- Save all changes and examine the resulting app.

### Conclusions

In this exercise, you updated the app to use the resolve in ui-router to simplify the controllers.

# Exercise (Instructions): Displaying Loading Message During State Transition

### Objectives and Outcomes

In this exercise you will learn to make use of the support for events in Angular to trigger the showing and hiding of a loading message in your application. At the end of this exercise, you will be able to:

- Use $rootScope to create a mechanism to display and hide loading message
- Use the ui-router events to show and hide the loading message

### Updating the run method in app.js

- Open app.js and update the run method as follows:

```
.run(function($ionicPlatform, $rootScope, $ionicLoading) {
```

- Then, add the following code to the end of the run method:

```
$rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
```

- Save the changes and examine the application.

### Conclusions

In this exercise, you have learnt about watching for events and triggering some action in response to the events.

# Exercise (Instructions): Using Local Storage

### Objectives and Outcomes

In this exercise, you will learn about HTML5 local storage and how you can leverage this to support the storing of information in your app in local storage. At the end of this exercise, you will be able to:

- Design a new Angular service using local storage
- Make use of the Local Storage to remember user information

### Adding $localStorage Service

- Open *services.js* and add the following $localStorage service code to it:

```
.factory('$localStorage', ['$window', function($window) {
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  }
}])
```

### Updating AppCtrl

- Open *controllers.js* and update the AppCtrl controller as follows to inject $localStorage:

```
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage) {
```

- Then update the initialization of loginData JavaScript object as follows:

```
    $scope.loginData = $localStorage.getObject('userinfo','{}');
```

- Finally, within the doLogin() function in AppCtrl, update it as follows:

```
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        . . .

     };
```

- Save the changes and check the updated application.

### Conclusions

In this exercise, you learnt to make use of the HTML5 local storage within your application, first by creating a service to wrap the local storage, and then inject into a controller in order to use the storage.

# Exercise (Instructions): Customizing and Controlling the Splash Screen

### Exercise Resources

# Exercise (Instructions): Customizing and Controlling the Splash Screen

### Exercise Resources

https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/_9da018ec6a67a243cf9992e57f0f6012_icon.png?expiry=1500595200000&hmac=QjBSm0El0Ots6VqJ3ylFQTQ8WYDzS_NYcR76zko3Mq4

https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/_9da018ec6a67a243cf9992e57f0f6012_splash.png?expiry=1500595200000&hmac=0KH8YEoRqC7mwBj2sIMsZ2L1TwStlaZw7BrOz5dtdQk

### Objectives and Outcomes

In this exercise you will learn how to customize the splash screen and also control the duration of its display on the screen. To do this, you will make use of Cordova through the ngCordova splash screen support. At the end of this exercise, you will be able to:

- Customize the splash screen of an Ionic application
- Control the display of the splash screen through the Cordova plugin support

### Customizing the Splash Screen

- Download the icon.png and splash.png files provided above and move them to the *conFusion/resources* folder.
- At the command prompt, type the following to prepare the icon and splash screen images for different screen resolutions and densities:

```
     ionic resources
```

- You can rebuild and deploy your application to the emulator or a device to observe the new splashscreen.

### Updating config.xml

- Open *config.xml* file in the conFusion folder and update it by adding a new line to the preferences as follows:

```
  <preference name="AutoHideSplashScreen" value="false" />
```

### Updating app.js to Dismiss the Splash Screen

- Open *app.js* and update the angular module by injecting *ngCordova* as follows:

```
angular.module('conFusion', ['ionic', 'ngCordova', 'conFusion.controllers','conFusion.services'])
```

- Then update the run method by injecting *$cordovaSplashscreen* and *$timeout *as follows:

```
.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
```

- Then, inside the $ionicPlatform.ready() function, add the following code:

```
      $timeout(function(){
                $cordovaSplashscreen.hide();
      },20000);
```

### Updating index.html

- Open *index.html *and add the following line to the file to import *ng-cordova.js* file:

```
    <script src="lib/ngCordova/dist/ng-cordova.js"></script>
```

Make sure this line is between where you import *ionic.bundle.js* and *cordova.js*

- Save the changes and then switch to your terminal.

### Installing ngCordova

- At the terminal prompt, making sure you are in the *conFusion* folder, type the following to install *ngCordova*:

```
     bower install ngCordova --save
```

- Then, build the app and deploy it to the emulator or a device.

### Conclusions

In this exercise, you learnt the use of your first ngCordova and Cordova plugin in order to customize and control the splash screen.

# Exercise (Instructions): Notifying the User

### Objectives and Outcomes

In this exercise, you will use two different Cordova plugins for delivering notification to the user. You will use the local notification plugin to put a notification into the device's notification bar. In addition you will use the toast plugin to show a short message on the screen to alert the user. At the end of this exercise, you will be able to:

- Use the Cordova Local Notification plugin together with the ngCordova wrapper to put notifications into the device's notification bar
- Use the Cordova Toast plugin together with the ngCordova wrapper to show a short message to the user on the device's screen

### Adding the Cordova Plugins

- First, add the Cordova plugin for the local notifications by typing the following at the command prompt:

```
     ionic plugin add de.appplant.cordova.plugin.local-notification
```

- Then, install the Cordova Toast plugin by typing the following at the prompt:

```
     ionic plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
```

### Updating MenuController

- Update the *MenuController* to inject the *$ionicPlatform, $cordovaLocalNotification* and *$cordovaToast* as follows:

```
.controller('MenuController', ['$scope', 'dishes', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
```

- Then add the following to the *addFavorite()* function in *MenuController*:

```
        $ionicPlatform.ready(function () {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[index].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification ');
                });

                $cordovaToast
                  .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });
        });

```

- Save the changes, build and deploy the application to the emulator to see the changes.

### Conclusions

In this exercise, you learnt to use the Cordova local notifications and toast plugins to notify the user.

# Exercise (Instructions): Using the Camera Plugin

### Objectives and Outcomes

In this exercise, you will continue exploring more Cordova plugins. In particular, you will use the Cordova camera plugin to access the device's built-in camera to retrieve image data and use it within your application. At the end of this exercise, you will be able to:

- Use the Cordova camera plugin together with the ngCordova wrapper to access the device's native camera to retrieve image data
- Make use of the image data within your application

### Adding the Cordova Camera Plugin

- First, add the Cordova camera plugin by typing the following at the command prompt:

```
     ionic plugin add cordova-plugin-camera
```

- Or use the following command at the command prompt, if your Cordova version is below 5.0:

```
     ionic plugin add org.apache.cordova.camera
```

### Updating sidebar.html

- Add the following additional list item to the sidebar menu in *sidebar.html*:

```
        <ion-item menu-close ng-click="register()">
          Register
        </ion-item>
```

### Updating AppCtrl Controller

- Open controllers.js and update the AppCtrl controller definition as follows:

```
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera) {
```

- Then add in an empty JavaScript variable named *registration* as follows:

```
    $scope.registration = {};
```

- Then add the code to set up the registration modal as follows:

```
 // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        // Simulate a registration delay. Remove this and replace with your registration
        // code if using a registration system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };
```

- Add the following code to AppCtrl to make use of the Cordova camera plugin within our application:

```
$ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });

            $scope.registerform.show();

        };
    });
```

### Add the register.html Template

- In the *templates* folder, create a new file named *register.html,* and add the following code to it:

```
<ion-modal-view>
  <ion-header-bar>
    <h1 class="title">Register</h1>
    <div class="buttons">
      <button class="button button-clear" ng-click="closeRegister()">Close</button>
    </div>
  </ion-header-bar>
  <ion-content>
    <form ng-submit="doRegister()">
      <div class="list">
       <label class="item item-input">
       <span class="input-label">Your Picture</span>
       </label>
       <label class="item item-input">
       <img class="padding" ng-src="{{registration.imgSrc}}">
       </label>
       <label class="item item-input">
       <button class="button button-block button-positive" type="button" ng-click="takePicture()">
            Take Picture
        </button>
        </label>
        <label class="item item-input">
          <span class="input-label">First Name</span>
          <input type="text" ng-model="registration.firstname">
        </label>
         <label class="item item-input">
          <span class="input-label">Last Name</span>
          <input type="text" ng-model="registration.lastname">
        </label>
         <label class="item item-input">
          <span class="input-label">Username</span>
          <input type="text" ng-model="registration.username">
        </label>
       <label class="item item-input">
          <span class="input-label">Telephone Number</span>
          <input type="tel" ng-model="registration.telnum">
        </label>
       <label class="item item-input">
          <span class="input-label">Email</span>
          <input type="email" ng-model="registration.email">
        </label>
        <label class="item">
          <button class="button button-block button-positive" type="submit">Register</button>
        </label>
      </div>
    </form>
  </ion-content>
</ion-modal-view>
```

- Save the changes, build and deploy the application and see the changes.

### Conclusions

In this exercise, you learnt to use the Cordova camera plugin within your application to retrieve image data from the device's camera.