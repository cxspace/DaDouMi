var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义领导的Schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
      featured: {
        type: Boolean,
        default: false
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


//导出供外部使用
var leaderships = mongoose.model('leadership', leadershipSchema);

module.exports = leaderships;