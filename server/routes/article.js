exports.autowired = {
    'get' : {
        '/getArticle/:type/:page/:size' : (req, res, next)=>{
            console.log([typeof req.params.type, typeof req.params.page, typeof req.params.size])
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM article WHERE type=? ORDER BY date DESC LIMIT ?,?',
                    [parseInt(req.params.type), parseInt(req.params.page), parseInt(req.params.size)], (err, result) => {
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
