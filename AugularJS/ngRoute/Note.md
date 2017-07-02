# Exercise (Instructions): Angular ngRoute and SPAs

### Objectives and Outcome

In this exercise, you will explore single page applications and Angular's support for SPA with the ngRoute module. At the end of this exercise, you will be able to:

- Design SPA using Angular support for SPA
- Use the ngRoute module to support SPA

### Set up angular-route

- Use Bower to install angular-route by typing the following at the command prompt:

```
bower install angular-route -S
```

### Configuring index.html

- Add angular-route.js to the index.html file as follows:

```
<script src="../bower_components/angular-route/angular-route.min.js"></script>
```

- Next, replace the ngInclude directive with the ngView directive as follows:

```
<ng-view></ng-view>
```

Save *index.html*

### Configuring ngRoute in app.js

- Open app.js and use the dependency injection to include ngRoute as follows:

```
angular.module('confusionApp', ['ngRoute'])
```

- Then, add the following code to config the router:

```
.config(function($routeProvider) {
        $routeProvider
            // route for the contactus page
            .when('/contactus', {
                templateUrl : 'contactus.html',
                controller  : 'ContactController'
            })
            // route for the menu page
            .when('/menu', {
                templateUrl : 'menu.html',
                controller  : 'MenuController'
            })
            // route for the dish details page
            .when('/menu/:id', {
                templateUrl : 'dishdetail.html',
                controller  : 'DishDetailController'
            })
            .otherwise('/contactus');
    })
```

### Updating services.js

- Open *services.js* file and configure the dishes object to include an id for each dish object. For each of the dish objects, introduce an id as follows:

```
   var dishes=[
                         {
                          _id:0,
                          name:'Uthapizza',

               . . .

                        },
                        {
                          _id:1,
                          name:'Zucchipakoda',

               . . .

                        }
                ];
 
```

### Configuring menu.html

- Next open *menu.html* and update the href for the image as follows:

```
 <div class="media-left media-middle">
                        <a ng-href="#/menu/{{dish._id}}">
                        <img class="media-object img-thumbnail"
                        ng-src={{dish.image}} alt="Uthappizza">
                        </a>
</div>
```

### Configuring DishDetailController

- Open *controllers.js* file and update the DishDetailController as follows:

```
.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($routeParams.id,10));                        $scope.dish = dish;
                    }])
```

- Save and view the web page.

### Conclusions

In this exercise you explored SPA and used the ngRoute module to design a SPA.

# important error

```
Angular JS Uncaught Error: [$injector:modulerr]

In development I recomend you to use not minified distributives: And all errors become more informative! Instead angular.min.js use angular.js

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.js">     
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-route.js">
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-resource.js">


or 


<script src="../bower_components/angular/angular.js"></script>
<script src="../bower_components/angular-resource/angular-resource.js"></script>
<script src="../bower_components/angular-route/angular-route.js"></script>

```