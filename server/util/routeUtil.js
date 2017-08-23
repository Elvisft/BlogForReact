let fs = require('fs'),extend = require('extend');
let path = require('path');
let express = require('express');
let router = express.Router();

let config={
    "class-route-path":false,
    "scan-path":"routes",
    "route-property":"autowired"
}

let getRootPath=(temPath)=>{
    while (true){
        let file= fs.readdirSync(temPath);
        for(let i=0;i<file.length;i++){
            if(file[i]==='route.json'){
                return temPath;
            }
        }
        if(temPath===path.dirname(temPath)) return undefined;
        else temPath=path.dirname(temPath);
    }
}
let loadFile = (filePath, path)=> {
    let routeObj = require(filePath),jsPath='';
    if(config["class-route-path"]) jsPath='/'+path.match(/\w*/).toString();
    //如果包含autoroute属性，则进行解析
    if (routeObj[config["route-property"]]) {

        for (let method in routeObj[config["route-property"]]) {
            let routeList = routeObj[config["route-property"]][method];

            if (!routeList) {
                break ;
            }

            //method就是上面取到的get、post

            for(let routeRule in routeList) {
                //func获取得到的就是上面对应各项的处理函数
                let func = routeList[routeRule];
                router[method](jsPath+routeRule, func);
            }
        }
    }
}


let rootPath=getRootPath(path.normalize(path.dirname(require.main.filename)));
let routesPath =rootPath+'/'+config["scan-path"];

fs.readFileSync(rootPath + '/route.json');
extend(true,config,JSON.parse(fs.readFileSync(rootPath + '/route.json')));

fs.readdir(routesPath, (err, file)=>{
    if(err){
        return;
    }

    file.map((path) => {
        let filepath=routesPath+'/'+path;
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


module.exports = router;

