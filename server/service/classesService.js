var getAll= (conn) => {
    conn.query('select * from classes',[], (err, result) => {
        if(err){
            return err;
        }else{
            return result;
        }
    });
}
