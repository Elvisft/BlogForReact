exports.autowired = {
    'get' : {
        '/getArticle/:type/:page/size' : (req, res, next)=>{
            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM article WHERE type=? ORDER BY date DESC LIMIT ?,?',
                    [req.param.type, req.param.page, req.param.size], (err, result) => {
                        console.log(result)
                    });
            })
        }
    },
    'post' : {

    }
};
