exports.autowired={
    'get' : {
        '/test':(req, res, next)=>{
            console.log(req);
            res.json({name:'qw'});
        }
    },
    'post':{
        '/in':(req, res, next)=>{
            req.on("data",(chunk)=>{
                let user = JSON.parse(chunk);
                console.log(user);
                let sql = 'SELECT count(*) AS count FROM user WHERE name = ? AND password= ?'
                let params = [user.username, user.password];
                req.getConnection((err, conn) => {
                    conn.query(sql, params, (err, result) => {
                        if(err){
                            console.log(err)
                            res.json(err);
                        }else{
                            res.json(result.count);
                        }
                    });
                });

            });
        }
    }
}