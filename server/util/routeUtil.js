let fs = require('fs');
let path = require('path');
let express = require('express');
let router = express.Router();

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

let rootPath=getRootPath(path.normalize(path.dirname(require.main.filename)));

let routesPath =rootPath+'\\routes';
console.log(rootPath);
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
                router[method]('/'+path.match(/\w*/).toString()+routeRule, func);
            }
        }
    }
}

fs.readdir(routesPath, (err, file)=>{
    if(err){
        return;
    }

    file.map((path) => {
        let filepath=routesPath+'\\'+path;
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

