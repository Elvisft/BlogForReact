// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   req.getConnection( (err, conn)=> {
//     if(err){
//       return next(err);
//     }else{
//
//     }
//   });
//
// });
//
// module.exports = router;
exports.autowired = {
    'get' : {
        '/' : (req, res, next)=>{
            res.send('respond with a resource');
        }
    },
    'post' : {

    }
};