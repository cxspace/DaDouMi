# Exercise (Instructions): Client-Server Communication using $http

## Objectives and Outcomes

In this exercise, you will learn about how to use the built-in Angular $http service to communicate with the server and retrieve the data from the server. At the end of this exercise, you will be able to:

- Use the $http service to retrieve data from a server using the $http.get() method

- Use the retrieved data to render the page in your web application

## Updating Services

- Open services.js to update it to retrieve data from the server. First add a constant to the Angular module as follows:

```

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")

```


- Next you will do dependency injection into the menuFactory service of the $http service and baseURL constant as follows:


```

 .service('menuFactory', ['$http', 'baseURL', function($http,baseURL) {

            . . .

        }])

```

Make sure to put the closing ] at the end of the service function, to close the dependency array.


- Then, you will go into the menuFactory service and delete the dishes object from there. You will download the dishes information from the server.


- Next, update the two method in the menuFactory service to use the $http service as follows:

```

                this.getDishes = function(){
                                        return $http.get(baseURL+"dishes");
                                    };
                    this.getDish = function (index) {
                                        return $http.get(baseURL+"dishes/"+index);

                };

```

- Save the services.js file and then open controllers.js file.

### Updating the Controllers


- Update the code in the MenuController to retrieve the data from the service as follows:

```

        $scope.dishes= [];
            menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                }
            );

```

- Similarly update the DishDetailController as follows:

```
    $scope.dish = {};
                        menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                }
            );


```

- Also update the IndexController to retrieve the data for the dish from the server as follows:

```
                        $scope.dish = {};

                        menuFactory.getDish(0)
                        .then(
                            function(response){
                                $scope.dish = response.data;
                                $scope.showDish = true;
                            }
                        );

```

- Save controllers.js and then open menu.html

- Update the following code in menu.html as shown below to remove the _ from the id:


```
<a ui-sref="app.dishdetails({id: dish.id})">

```

- Save the changes in menu.html and then view the web page in the browser.


### Conclusions

In this exercise, we updated the app to retrieve the data from the server using the $http.get() request.

# Exercise (Instructions): Handling Errors in Client-Server Communication using $http

### Objectives and Outcomes

In this exercise, we will update the code in the controllers to be able to handle errors that might be caused when errors occur while retrieving data from the server. At the end of this exercise, you will be able to:

- Handling errors in communication between the client and the server.
- Ensure that the user is delivered meaningful message on the web page to indicate error in communicating with the server.

### Updating the Controllers

- Open *controllers.js* to update the code to handle errors. Update the code in the *MenuController* as follows:

```
            $scope.showMenu = false;
            $scope.message = "Loading ...";
                        $scope.dishes= {};
                        menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
```

- Now, open *menu.html *and update the code as follows:

```
        <div class="row row-content" ng-controller="MenuController">
            <div class="col-xs-12" ng-if="!showMenu">
                <h3>{{message}}</h3>
            </div>
            <div class="col-xs-12" ng-if="showMenu">
```

Note the use of the *ngIf* directive in order to add/delete the div from the DOM.

- Next, update *DishDetailController* in *controllers.js* as follows:

```
           $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
                        menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
```

- Also, update *IndexController* as follows:

```
                     $scope.dish = {};
                        $scope.showDish = false;
                        $scope.message="Loading ...";

                        menuFactory.getDish(0)
                        .then(
                            function(response){
                                $scope.dish = response.data;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
```

- Then, update the *dishdetail.html* as follows:

```
        <div class="row row-content" ng-controller="DishDetailController">
            <div class="col-xs-12" ng-if="!showDish">
                <h3>{{message}}</h3>
            </div>
            <div class="col-xs-12" ng-if="showDish">
```

- Also update *home.html* as follows:

```
            <div class="col-xs-12 col-sm-9 col-sm-pull-3">
                <div ng-if="!showDish">
                    <h3>{{message}}</h3>
                </div>
                <div class="media" ng-if="showDish">
```

- Save all the changes and then have a look at the web page.

### Conclusions

In this exercise, we extended the previous exercise to handle errors that result during access to the server.











