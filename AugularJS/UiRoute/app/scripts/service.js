/**
 * Created by liujie on 2017/7/2.
 */
'use strict';

angular.module('confusionApp').constant("baseURL"," http://localhost:3000")

    .service('menuFactory',[ '$http', 'baseURL', function ($http,baseURL) {


    // var dishes=[
    //     {
    //         _id:0,
    //         name:'Uthapizza',
    //         image: 'images/uthapizza.png',
    //         category: 'mains',
    //         label:'Hot',
    //         price:'4.99',
    //         description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    //         comment: ''
    //     },
    //     {
    //         _id:1,
    //         name:'Zucchipakoda',
    //         image: 'images/zucchipakoda.png',
    //         category: 'appetizer',
    //         label:'',
    //         price:'1.99',
    //         description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
    //         comment: ''
    //     },
    //     {
    //         _id:2,
    //         name:'Vadonut',
    //         image: 'images/vadonut.png',
    //         category: 'appetizer',
    //         label:'New',
    //         price:'1.99',
    //         description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
    //         comment: ''
    //     },
    //     {
    //         _id:3,
    //         name:'ElaiCheese Cake',
    //         image: 'images/elaicheesecake.png',
    //         category: 'dessert',
    //         label:'',
    //         price:'2.99',
    //         description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    //         comment: ''
    //     }
    // ];

    this.getDishes = function(){
        return $http.get(baseURL+"/dishes");
    };
    this.getDish = function (index) {
        return $http.get(baseURL+"/dishes/"+index);
    };

}]);