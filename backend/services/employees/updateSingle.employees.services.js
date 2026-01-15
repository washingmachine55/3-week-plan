import pool from "../../config/db.js";

export default async function patchSingle(req) {

	const entryToDelete = req.params.id;

	const keys = []
	const values = []
	const sqlHelper = []
	let i = 1

	Object.entries(req.body.employee_info).forEach(([key, value]) => {
		keys.push(key)
		values.push(value)
		sqlHelper.push((`${key} = $`+i++))
	});
	values.push(entryToDelete)

	const client = await pool.connect();
	try {
		const queryParams = sqlHelper.join(", ")
		const query = ["UPDATE employees SET", queryParams, `WHERE id = $${i}`, "RETURNING *"].join(" ")
		const queryResult = await client.query(query, values)
		
		return queryResult.rows;

	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}