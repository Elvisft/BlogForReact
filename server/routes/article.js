const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');
exports.autowired = {
    'get' : {
        '/getArticles/:type/:page/:size' : (req, res, next)=>{
            let type = parseInt(req.params.type),page = parseInt(req.params.page), size = parseInt(req.params.size);

            req.getConnection((err, conn) => {
                conn.query('SELECT id,title,type,briefing,date_format(date,"%c.%d.%Y") as date FROM article WHERE type IN ( '+
                'select id '+
                'from( '+
                    'select a1.id,a1.name, '+
                    'a1.parent_id,a2.parent_id p2id,a3.parent_id p3id,a4.parent_id p4id,a5.parent_id p5id '+
                    'from '+
                'classes a1 left join classes a2 '+
                'on(a1.parent_id=a2.id) '+
                'left join classes a3 '+
                'on(a2.parent_id=a3.id) '+
                'left join classes a4 '+
                'on(a3.parent_id=a4.id) '+
                'left join classes a5 '+
                'on(a4.parent_id=a5.id) '+
                ') al '+
                'where (parent_id=? or p2id=? or p3id=? or p4id=? or p5id=?) '+
                ') ORDER BY date DESC LIMIT ?,?',
                    [type, type, type, type, type, page, size], (err, result) => {
                        if(err){
                            res.json(err);
                        }else{
                            console.log(result)
                            res.json(result);
                        }
                    });
            })
        },
        '/getArticles/id' : (req, res, next) => {
            let id = req.params.id;
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM article WHERE id=?',[id], (err, result) => {
                    if(err){
                        res.json(err);
                    }else{
                        console.log(result)
                        res.json(result);
                    }
                });
            });
        }
    },
    'post' : {
        '/test': (req, res, next) => {
            //生成multiparty对象，并配置上传目标路径
            let form = new multiparty.Form({uploadDir: './server/static/image'});
            //上传完成后处理
             form.parse(req, function(err, fields, files) {
                 let filesTmp = JSON.stringify(files,null,2);
                 if(err){
                     console.log('parse error: ' + err);
                 } else {
                     console.log('parse files: ' + filesTmp);
                     let inputFile = files.image[0];
                     let uploadedPath = inputFile.path;
                     let dstPath = './server/static/image/' + inputFile.originalFilename;
                     //重命名为真实文件名
                     fs.rename(uploadedPath, dstPath, function(err) {
                         if(err){
                             console.log('rename error: ' + err);
                         } else {
                             console.log('rename ok');
                         }
                     });
                 }

                 res.json({ data: { link: 'http://106.14.150.87/static/image/1.jpg'}});
             });
        }
    }
};
