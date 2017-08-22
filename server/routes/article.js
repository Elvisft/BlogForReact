var express = require('express');
var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
exports.autowired = {
    'get' : {
        '/' : (req, res, next)=>{
            res.send('respond with a resource');
        }
    },
    'post' : {

    }
};
