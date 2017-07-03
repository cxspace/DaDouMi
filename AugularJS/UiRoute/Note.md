# Exercise (Instructions): Angular UI-Router for Single Page Applications

### Objectives and Outcomes

In this exercise, you will use the Angular UI-router to design a SPA that makes use of multiple views and nested views in a page. At the end of this exercise, you will be able to:

- Use the Angular UI-Router to design a SPA with multiple and nested views
- Reogranize the application and complete the SPA in a modular manner

### Installing Angular UI-Router

- Use Bower to install angular-ui-router by typing the following at the command prompt:

```
     bower install angular-ui-router -S
```

### Configuring UI Router

- Open app.js and configure it to use the UI Router. Replace the config function that we had for the ngRoute with the new config for the UI router.
- First, inject the UI router into the module:

```
angular.module('confusionApp', ['ui.router'])
```

- Next introduce the config for the UI router:

```
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        template : '<h1>To be Completed</h1>',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
                    // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        template: '<h1>To be Completed</h1>'
                   }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
    })


```

### Updating the DishDetailController

- Update the DishDetailController to use $stateParams as follows:

```
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
                        $scope.dish = dish;
                    }])

```

### Creating View Templates

- In the *app* folder, create a sub-folder named *views*, and move all the templates into this folder.
- In the views folder, create two new files named *header.html* and *footer.html*.
- From the *index.html* page, cut out the *<nav>* and the *<header>* part of the page and move it to *header.html*.
- Also, from *index.html* page, move all the code in the *<footer>* tag over to footer.html file.
- In *index.html*, replace the *ngView* with uiView as follows:

```
    <div ui-view="header"></div>
    <div ui-view="content"></div>
    <div ui-view="footer"></div>
```

- Also, update the <scripts> tag to use angular-ui-router.min.js instead of angular-route.js as follows:

```
    <script src="../bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
```

- Open *header.html* and update the hrefs using ui-srefs as follows:

```
      <a class="navbar-brand" ui-sref="app"><img src="images/logo.png" height=30 width=41></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a ui-sref="app">
                        <span class="glyphicon glyphicon-home"
                         aria-hidden="true"></span> Home</a></li>
                    <li><a ui-sref="app.aboutus">
                        <span class="glyphicon glyphicon-info-sign"
                         aria-hidden="true"></span> About</a></li>
                    <li><a ui-sref="app.menu">
                         <span class="glyphicon glyphicon-list-alt"
                         aria-hidden="true"></span>
                          Menu</a></li>
                     <li><a ui-sref="app.contactus">
                     <i class="fa fa-envelope-o"></i> Contact</a></li>
                </ul>
            </div>
```

- Next, update the hrefs in the footer to use ui-srefs as follows:

```
             <ul class="list-unstyled">
                        <li><a ui-sref="app">Home</a></li>
                        <li><a ui-sref="app.aboutus">About</a></li>
                        <li><a ui-sref="app.menu">Menu</a></li>
                        <li><a ui-sref="app.contactus">Contact</a></li>
                    </ul>
```

- Make sure you moved *menu.html*, *contactus.html* and *dishdetail.html* to the *views* folder.
- Then, edit *menu.html* to update the href there to use the ui-sref as follows:

```
                        <a ui-sref="app.dishdetails({id: dish._id})">
                        <img class="media-object img-thumbnail"
                        ng-src={{dish.image}} alt="Uthappizza">
                        </a>
```

- Finally, edit *dishdetail.html* file to include a button so that we can click it to return the menu as follows:

```
            <div class="col-xs-12">
                <button class="btn btn-xs btn-primary pull-right"
                    type="button" ui-sref="app.menu">
                    Back to Menu
                </button>
                <div class="media">
```

- Save all the files and have a look at the completed SPA

### Conclusions

In this exercise, you used Angular UI-router to design a SPA with multiple and nested views. You saw the powerful features provided by the UI-router.