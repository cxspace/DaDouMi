var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;


require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

//定义评论的Schema
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },

    //关联到发布评论的User
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {

    //需要时间戳记录操作
    timestamps: true
});


//定义食物的Schema

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Currency,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    },   

    // 评论作为子项目存储
    comments:[commentSchema]
}, {
    timestamps: true
});

//将Dishes Model导出
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
