import {Route, TYPE} from '../util/routeUtil';

import {connection} from '../util/mysql';

@Route({path: 'classes'})
export class Classes {
    @Route({path: 'getClasses/:id', type: TYPE.GET})
    async getClasses(ctx, next) {

        // const [rows, fields] = connection.execute(`SELECT id,name,has_child FROM classes WHERE parent_id= ${ctx.params.id}`);
        const fields = await connection.execute(`SELECT id,name,has_child FROM classes WHERE parent_id=2`);
       console.log(fields);
        ctx.body = 'Hello World';
    }
}