import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';

declare const require: any;
export enum TYPE{
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put'
}
let routes: Map<{ target: any, type: string, path: string }, Function | Function[]> = new Map();
let ctrls: string;
export const Route = (config) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        if (typeof target === 'function') {
            ctrls = config.path;
        } else {
            routes.set({
                target: target,
                path: config.path,
                type: config.type
            }, target[name]);
        }
    };
};
let config = {
    'scan-path': 'routes',//route存放路径
};

//获取项目根路径
const getRootPath = (temPath) => {
    while (true) {
        let file = fs.readdirSync(temPath);
        for (let i = 0; i < file.length; i++) {
            if (file[i] === 'route.json') {
                return temPath;
            }
        }
        if (temPath === path.dirname(temPath)) return undefined;
        else temPath = path.dirname(temPath);
    }
};

let routesPath = getRootPath(path.normalize(path.dirname(require.main.filename))) + path.sep + config['scan-path'];
const file = fs.readdirSync(routesPath);
let router = new Router();
for (let ts of file) {
    let filepath = routesPath + path.sep + ts;
    require(filepath);
    for (let [config, controller] of routes) {
        let controllers = Array.isArray(controller) ? controller : [controller];
        for (let controller of controllers) {
            router[config.type](`/${ctrls}/${config.path}`, controller);
        }
    }
    routes = new Map();
}
export default router;