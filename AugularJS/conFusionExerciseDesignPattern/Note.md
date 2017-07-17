# mac下查找端口是否占用及关闭占用端口进程-grunt serve启动后的关闭问题

如何查找某个端口是否被占用:

我们查找下 3009 端口当前被谁占用

```
zhangzhi@moke:~/code/work$ lsof -i:3009
```

结果显示:

```
COMMAND   PID     USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    14937 zhangzhi   19u  IPv4 0xc7e40c3b908f5c71      0t0  TCP *:pxc-ntfy (LISTEN)
```

可以看到一个node进程占用了 3009 端口.

如何关闭此进程:

```
zhangzhi@moke:~/code/work$ kill -9 14937
```

# Exercise (Instructions): Angular Factory and Service

### Objectives and Outcomes

In this exercise you will explore dependency injection in Angular. You will also learn about designing custom services using the factory and the service approaches. At the end of this exercise, you will be able to:

- Use dependency injection to enable the use of custom services in Angular modules and controllers
- Design custom services using the Angular factory and service approaches

### Creating controllers.js and services.js

- In the *scripts* sub-folder of the *app* folder, create two new files named *controllers.js* and *services.js*.
- Open *app.js* and copy the entire code there and copy it into *controllers.js*.
- Next, we will edit the code as follows. Remove the square brackets from the angular.module( ), so that it us updated as shown below:

```
angular.module('confusionApp')
```

- Next, go to *app.js* and delete all the controller code from it, so that your *app.js* file will contain only the following code

```
'use strict';

angular.module('confusionApp', []);
```

- Next, open *menu.html* and at then include *controller.js* and *services.js* using <script> tag.

```
  <script src="scripts/controllers.js"></script>
  <script src="scripts/services.js"></script>
```

# important !!!!!

```
app.js reference must write before controller.js and services.js  

<script src="scripts/app.js"></script>
<script src="scripts/controller.js"></script>
<script src="scripts/services.js"></script>
```

- Open services.js and add the following code:

```
'use strict';

angular.module('confusionApp')
        .factory('menuFactory', function() {

        });
```

- Next, add the following JavaScript array into the factory code above:

```
      var dishes=[
                         {
                          name:'Uthapizza',
                          image: 'images/uthapizza.png',
                          category: 'mains',
                           label:'Hot',
                          price:'4.99',
                          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }                                                          ]
                        },
                        {
                          name:'Zucchipakoda',
                           image: 'images/zucchipakoda.png',
                          category: 'appetizer',
                           label:'',
                          price:'1.99',
                          description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                          comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }                                                          ]
                        },
                        {
                          name:'Vadonut',
                           image: 'images/vadonut.png',
                          category: 'appetizer',
                           label:'New',
                          price:'1.99',
                          description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                           comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }
                                                          ]
                        },
                        {
                          name:'ElaiCheese Cake',
                           image: 'images/elaicheesecake.png',
                          category: 'dessert',
                           label:'',
                          price:'2.99',
                          description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                           comments: [
                               {
                                   rating:5,
                                   comment:"Imagine all the eatables, living in conFusion!",
                                   author:"John Lemon",
                                   date:"2012-10-16T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                                   author:"Paul McVites",
                                   date:"2014-09-05T17:57:28.556094Z"
                               },
                               {
                                   rating:3,
                                   comment:"Eat it, just eat it!",
                                   author:"Michael Jaikishan",
                                   date:"2015-02-13T17:57:28.556094Z"
                               },
                               {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                               },
                               {
                                   rating:2,
                                   comment:"It's your birthday, we're gonna party!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                               }                                                          ]
                        }
                        ];
```

- Next, introduce an empty JavaScript object into the factory as follows:

```
var menufac = {};
```

- Finally, add the following code to the factory to define the function and return the object:

```
           menufac.getDishes = function(){
                                        return dishes;
                                    };
                    menufac.getDish = function (index) {
                                        return dishes[index];
                };
                return menufac;
```

- Now, open *controllers.js* and then from the *MenuController* delete the dishes object. Then, add the following statement in its place:

```
            $scope.dishes= menuFactory.getDishes();
```

- Now we do dependency injection to introduce the *menuFactory* service into *MenuController*:

```
      .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
```

- Next, we move to the DishDetailController and remove the dish object from it and replace it with the following:

```
            $scope.dish= menuFactory.getDish(3);
```

- Then, we do dependency injection into the DishDetailController as follows

```
        .controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {
```

- After saving the changes, move to dishdetail.html and add in the following code to include the JS files:

```
    <script src="scripts/controllers.js"></script>
    <script src="scripts/services.js"></script>
```

### Using Service instead of Factory

- Go to services.js and remove the following two statements from the code:

```
          var menufac = {};

            . . .

            return menufac;
```

- Then change the function code as follows, replacing *menufac* with *this*:

```
  this.getDishes = function(){
                                        return dishes;
                                    };
                    this.getDish = function (index) {
                                        return dishes[index];

                };
```

- Then, change the *factory* to *service* as follows:

```
        .service('menuFactory', function() {
```

- Save the changes and see the result.

### Conclusions

In this exercise we explored dependency injection and the use of Angular services and defining custom services using the factory or the service approach.