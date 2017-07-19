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