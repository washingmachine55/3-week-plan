import pool from "../config/db.js";

export default async function patchSingle(id, bodyKey, tableName) {

	const entryToDelete = id;

	const keys = []
	const values = []
	const sqlHelper = []
	let i = 1

	Object.entries(bodyKey).forEach(([key, value]) => {
		keys.push(key)
		values.push(value)
		sqlHelper.push((`${key} = $`+i++))
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