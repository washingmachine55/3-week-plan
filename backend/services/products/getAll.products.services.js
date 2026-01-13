import pool from "../../config/db.js";

export default async function getAll(req) {

	const field = !req.query.field ? 'name' : req.query.field
	const sort = !req.query.sort ? 'DESC' : req.query.sort
	const limit = !req.query.limit ? 2 : req.query.limit

	const client = await pool.connect();
	try {
		const query = {
			name: 'fetch-products',
			text: 'SELECT * FROM products ORDER BY $1 LIMIT $2',
			values: [[field, sort], limit],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}