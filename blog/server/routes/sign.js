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
                let sql = 'SELECT count(*) AS signIn FROM user WHERE name = ? AND password= ?';
                let params = [user.userName, user.password];
                req.getConnection((err, conn) => {
                    conn.query(sql, params, (err, result) => {
                        if(err){
                            console.log(err)
                            res.json(err);
                        }else{
                            console.log(result[0]);
                            res.json(result[0]);
                        }
                    });
                });

            });
        }
    }
}