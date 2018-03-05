import {Route, TYPE} from '../util/routeUtil';
import {pool} from '../util/mysql';

@Route({path: 'classes'})
export class Classes {
    @Route({path: 'getClasses/:id', type: TYPE.GET})
    async getClasses(ctx, next) {
        const result = await pool.query(`SELECT id,name,has_child FROM classes WHERE parent_id= ${ctx.params.id}`);
        ctx.body = result;
    }
}