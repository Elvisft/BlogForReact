exports.autowired = {
    'get' : {
        '/getArticle/:type/:page/:size' : (req, res, next)=>{
            let type = parseInt(req.params.type),page = parseInt(req.params.page), size = parseInt(req.params.size);
            console.log([typeof req.params.type, typeof req.params.page, typeof req.params.size])
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM article WHERE type IN ( '+
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
                ') ORDER BY date DESC LIMIT 0,5',
                    [type, type, type, type, type, page, size], (err, result) => {
                        if(err){
                            res.json(err);
                        }else{
                            console.log(result)
                            res.json(result);
                        }
                    });
            })
        }
    },
    'post' : {

    }
};
