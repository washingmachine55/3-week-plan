import pool from "../config/db.js";

// export async function patchSingle(id, bodyKey, tableName) {

// 	const entryToDelete = id;

// 	const keys = []
// 	const values = []
// 	const sqlHelper = []
// 	let i = 1

// 	Object.entries(bodyKey).forEach(([key, value]) => {
// 		keys.push(key)
// 		values.push(value)
// 		sqlHelper.push((`${key} = $`+i++))
// 	});
// 	values.push(entryToDelete)

// 	const client = await pool.connect();
// 	try {
// 		const queryParams = sqlHelper.join(", ")
// 		const query = ["UPDATE", tableName, "SET", queryParams, `WHERE id = $${i}`, "RETURNING *"].join(" ")
// 		const queryResult = await client.query(query, values)
		
// 		return queryResult.rows;

// 	} catch (error) {
// 		console.log(error)
// 	} finally {
// 		client.release()
// 	}
// }

export default async function softDeleteSingle(id, tableName) {

	const entryToDelete = id;
	const todaysDate = new Date().toISOString();

	const client = await pool.connect();
	try {
		// const checkIfArchived = {
		// 	name: 'check-if-single-product-is-archived',
		// 	text: 'SELECT CASE WHEN EXISTS(SELECT * FROM products WHERE id = $1 AND status = 2) THEN 1 ELSE 0 END AS ExistsCheck',
		// 	values: [entryToDelete],
		// }
		const checkIfArchived = ["SELECT CASE WHEN EXISTS(SELECT * FROM", tableName, "WHERE id = $1 AND archived_at IS NOT NULL) THEN 1 ELSE 0 END AS ExistsCheck"].join(" ")
		const checkIfArchivedQueryResult = await client.query(checkIfArchived, [entryToDelete])
		const recordExistsCheck = checkIfArchivedQueryResult.rows[0].existscheck

		if (recordExistsCheck === 0) {
			// const query = {
			// 	name: 'archive-single-product-',
			// 	text: 'UPDATE products SET archived_at = $1, status = 2 WHERE id = $2 RETURNING *',
			// 	values: [todaysDate, entryToDelete],
			// }
			const query = ["UPDATE", tableName, "SET archived_at = $1 WHERE id = $2 RETURNING *"].join(" ")
			const queryResult = await client.query(query, [todaysDate, entryToDelete])
			return queryResult.rows;
		} else {
			return `Could not Delete. ID: ${entryToDelete} is already archived`
		}
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}