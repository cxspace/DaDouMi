/**
 * Created by marcos on 9/10/16.
 */

var mongoose = require('mongoose');
var Dish = require('./dishes');
var User = require('./user');
var Schema = mongoose.Schema;

//关联某个用户最喜欢的食物的Schema
// 食物的Id加上添加喜爱的用户的Id

var favoriteSchema = new Schema({
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

//导出Schema供外部使用
var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;
