
// var classes = require('./../routes/classes');
// var article = require('./../routes/article');
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
const routes={
    '/classes': classes,
    '/article': article
};



var routesDir = 'D:\\Document\\my-app\\server\\routes';
    // path.dirname(require.main.filename) + "\\routes";

loadFile = (filePath, path)=> {
    let routeObj = require(filePath);

    //如果包含autoroute属性，则进行解析
    if (routeObj.autowired) {

        for (let method in routeObj.autowired) {
            let routeList = routeObj.autowired[method];

            if (!routeList) {
                break ;
            }

            //method就是上面取到的get、post

            for(let routeRule in routeList) {
                //func获取得到的就是上面对应各项的处理函数
                let func = routeList[routeRule];

                router[method]('/'+path+routeRule, func);
            }
        }
    }
}

fs.readdir(routesDir, (err, file)=>{
    if(err){
        return;
    }

    file.map((path) => {
        let filepath=routesDir+'\\'+path;
        fs.stat(filepath, (err, stats)=> {
            if (err) {
                return ;
            }

            if (stats.isDirectory()) {
                //递归执行函数
            } else  {
                //加载文件并解析
                loadFile(filepath, path);
            }
        })
    });
});


// module.exports = routes;

