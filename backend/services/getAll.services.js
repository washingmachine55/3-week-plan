import pool from "../config/db.js";

export default async function getAll(id, bodyKey, tableName) {

	const entryToDelete = id;

	const keys = []
	const values = []
	const sqlHelper = []
	let i = 1

	Object.entries(bodyKey).forEach(([key, value]) => {
		keys.push(key)
		values.push(value)
		sqlHelper.push((`${key} = $` + i++))
	});
	values.push(entryToDelete)

	const client = await pool.connect();
	try {
		const queryParams = sqlHelper.join(", ")
		const query = ["UPDATE", tableName, "SET", queryParams, `WHERE id = $${i}`, "RETURNING *"].join(" ")
		const queryResult = await client.query(query, values)

		return queryResult.rows;

	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}

/* import pool from "../../config/db.js";

export default async function getAllProducts(req) {

	const allowedFields = ['name', 'price', 'created_at'];
	const allowedSorts = ['ASC', 'DESC'];

	const field = allowedFields.includes(req.query.field)
		? req.query.field
		: 'name';

	const sort = allowedSorts.includes(req.query.sort?.toUpperCase())
		? req.query.sort.toUpperCase()
		: 'DESC';

	const limit = Number(req.query.limit) || 2;

	const client = await pool.connect();
	try {
		const queryResult = await client.query(`SELECT * FROM products ORDER BY ${field} ${sort} LIMIT $1`, [limit])
		return queryResult.rows;
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}
 */