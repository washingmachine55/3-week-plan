import pool from "../config/db.js";
/**
 * 
 * @param {String} id Validated from middleware
 * @param {String} tableName Table to save into
 * @returns Returns row details from database
 */
export default async function softDeleteSingle(id, tableName) {

	const entryToDelete = id;
	const todaysDate = new Date().toISOString();

	const client = await pool.connect();
	try {
		const checkIfArchived = ["SELECT CASE WHEN EXISTS(SELECT * FROM", tableName, "WHERE id = $1 AND archived_at IS NOT NULL) THEN 1 ELSE 0 END AS ExistsCheck"].join(" ")
		const checkIfArchivedQueryResult = await client.query(checkIfArchived, [entryToDelete])
		const recordExistsCheck = checkIfArchivedQueryResult.rows[0].existscheck

		if (recordExistsCheck === 0) {
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