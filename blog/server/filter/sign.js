/**
 * Created by MR-Liu on 2017/11/26.
 */
const signFilter = (req, res, next )=>{

    if(req.originalUrl.indexOf('manage')!==-1){
        console.log(req);
    }
    next();
}
module.exports = signFilter;