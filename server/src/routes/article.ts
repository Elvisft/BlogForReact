import {Route, TYPE} from '../util/routeUtil';
import {pool} from '../util/mysql';
import {getPostData} from '../util/post-util';
import * as fs from 'fs';
import {Form} from 'multiparty';

@Route({path: 'article'})
export class Article{
    @Route({path: 'getArticles/:type/:page/:size', type: TYPE.GET})
    async getArticles(ctx){
        const {type, page, size} = ctx.params;
        const sql: string = type === '0' ? `ORDER BY date DESC LIMIT ${page},${size}` : `WHERE type=${type} ORDER BY date DESC LIMIT ${page}${size}`;
        const result = await pool.query(`SELECT id,title,type,briefing,date_format(date,"%c.%d.%Y") as date FROM article ${sql}`);
        ctx.body = result;
    }

    @Route({path: 'getArticle/:id', type: TYPE.GET})
    async getArticle(ctx){
        const result = await pool.query(`SELECT id,title,type,date_format(date,"%c.%d.%Y") as date,content FROM article WHERE id= ${ctx.params.id}`);
        ctx.body = result;
    }

    @Route({path: 'test', type: TYPE.POST})
    async test(ctx){
        console.log(123);
        let form = new Form({uploadDir: './assets/image/'});
        //上传完成后处理
        form.parse(ctx.req, (err, fields, files) => {
            let filesTmp = JSON.stringify(files,null,2);
            if(err){
                console.log('parse error: ' + err);
            } else {
                console.log('parse files: ' + filesTmp);
                let inputFile = files.image[0];
                let uploadedPath = inputFile.path;
                let dstPath = './assets/image/' + inputFile.originalFilename;
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, (err)=> {
                    if(err){
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                        ctx.body = { data: { link: 'http://106.14.150.87/static/image/1.jpg'}};
                    }
                });

            }

    });

    }

    @Route({path: 'update', type: TYPE.POST})
    async update(ctx){
        const article = await getPostData(ctx);
        let briefing = article.content.replace(/<(?:.|\s)*?>/g,'');
        if(briefing.length>100){
            briefing = briefing.substring(0,100);
        }
        const sql: string = article.id ?
            `UPDATE article SET title=${article.title},type=${article.type},date=${new Date(article.date)},briefing=${briefing},content=${article.content} WHERE id=${article.id}` :
            `INSERT INTO article (title,type,date,briefing,content) VALUES (${article.title},${article.type},${new Date(article.date)},${briefing},${article.content})`;
        const result = await pool.query(sql);
        ctx.body = result;
    }
}

