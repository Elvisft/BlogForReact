import router from './util/routeUtil';
/**
 * Created by MR-Liu on 2018/3/3.
 */
declare const require: any;
import * as Koa from 'koa';
import mysql from './util/mysql';
let app = new Koa();
app.context.db = mysql;

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(4444);