var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.getConnection( (err, conn)=> {
    if(err){
      return next(err);
    }else{
      conn.query('select * from classes',[], (err, result) => {
          if(err){
              return next(err);
          }else{
              res.append('Access-Control-Allow-Origin','*');
              // res.render('index', result );
            res.json(result);
          }
      });
    }
  });

});

module.exports = router;
