# 注意
关于
```
Uncaught TypeError: angular.module(...).info is not a function
    at angular-resource.js:445
    at angular-resource.js:858
```
错误

# 解决办法

```$xslt
this error usually happens if the module files don't match, check if  angular-resource.js and angular.js are the same version, (e.g. 1.6.1 on both).

```

# Exercise (Instructions): Client-Server Communication using $resource

### Objectives and Outcomes

In this exercise, you will make use of the Angular ngResource module and Angular $resource to access the data from a server that supports REST API. At the end of this exercise, you will be able to:

- Install and use Angular *ngResource* module
- Use Angular $resource to access the server that exports a REST API.

### Installing ngResource

- First, you will install the Angular *ngResource* module in your conFusion project by typing the following at the command prompt when you are in the conFusion folder:

```
     bower install angular-resource -S
```

- Remember to add angular-resource.min.js to the index.html file by including the following in the scripts section of the page, right after including angular-ui-router:

```
    <script src="../bower_components/angular-resource/angular-resource.min.js"></script>
```

- Inject the *ngResource* module into the Angular module by updating the angular.module() in *app.js* as follows:

```
angular.module('confusionApp', ['ui.router','ngResource'])
```

### Updating Services

- Next, open *services.js* and update the code in *menuFactory* as follows to use Angular $resource:

```
      .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
```

- Then update the *getDishes()* function as follows:

```
          this.getDishes = function(){
                                        return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                                    };
```

- Delete the *getDish(index)* function as we no longer need it. Save *services.js*.

### Updating Controllers

- Open *controllers.js* and update the code in *MenuController* as follows:

```
            $scope.showMenu = true;
            $scope.message = "Loading ...";
                        $scope.dishes = menuFactory.getDishes().query();
```

- Similarly update the *DishDetailController* as follows:

```
     $scope.showDish = true;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
```

- Finally, update the code in *IndexController* as follows:

```
                        $scope.showDish = true;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0});
```

- Save the changes and have a look at the web application in the browser.

### Conclusions

In this exercise you used the Angular ngResource module and Angular $resource to access a RESTful server.