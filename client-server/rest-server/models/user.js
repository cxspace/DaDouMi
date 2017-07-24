var passportLocalMongoose = require('passport-local-mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String,
    firstname:{
    	type:String,
    	default:''
    },
    lastname:{
    	type:String,
    	default:''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function(){
	return(this.firstname + ' ' + this.lastname);
};

//定义本地的passport存储
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
