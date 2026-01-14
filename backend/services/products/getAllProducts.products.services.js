import pool from "../../config/db.js";

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