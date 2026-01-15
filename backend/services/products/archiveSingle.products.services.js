import pool from "../../config/db.js";

export default async function archiveSingle(req) {

	const entryToDelete = req.params.id;
	const todaysDate = new Date().toISOString();

	const client = await pool.connect();
	try {
		const checkIfArchived = {
			name: 'check-if-single-product-is-archived',
			text: 'SELECT CASE WHEN EXISTS(SELECT * FROM products WHERE id = $1 AND status = 2) THEN 1 ELSE 0 END AS ExistsCheck',
			values: [entryToDelete],
		}
		const checkIfArchivedQueryResult = await client.query(checkIfArchived)
		const recordExistsCheck = checkIfArchivedQueryResult.rows[0].existscheck

		if (recordExistsCheck === 0) {
			const query = {
				name: 'archive-single-product-',
				text: 'UPDATE products SET archived_at = $1, status = 2 WHERE id = $2 RETURNING *',
				values: [todaysDate, entryToDelete],
			}
			const queryResult = await client.query(query)
			return queryResult.rows;
		} else {
			return `Could not Delete. Product ${entryToDelete} is already archived`
		}
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}