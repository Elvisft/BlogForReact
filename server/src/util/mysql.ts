/**
 * Created by MR-Liu on 2018/3/4.
 */
import * as mysql from 'mysql2';
export const connection = mysql.createConnection({
    host: '106.14.150.87',
    user: 'root',
    password: 'ger.170728##',
    port: 3306,
    database: 'blog'
});
