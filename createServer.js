var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

console.log("开始监听。");

// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({extended: false}));

// bodyParser.json解析json数据格式的
app.use(bodyParser.json());


app.post('/saveJSON',function(req, res){

 // 对象转换为字符串
 var str_json = JSON.stringify(req.body);

 fs.writeFile('graph.json', str_json, 'utf8', function(){
  // 保存完成后的回调函数
  console.log("保存完成");
 });

 app.post('/getJSON',function(req,res){
     var data = {
    "sites": [
        {
            "Name": "菜鸟教程",
            "Url": "www.runoob.com",
            "Country": "CN"
        },
        {
            "Name": "Google",
            "Url": "www.google.com",
            "Country": "USA"
        },
        {
            "Name": "Facebook",
            "Url": "www.facebook.com",
            "Country": "USA"
        },
        {
            "Name": "微博",
            "Url": "www.weibo.com",
            "Country": "CN"
        }
    ]
};


 });

});

app.listen(3001);
