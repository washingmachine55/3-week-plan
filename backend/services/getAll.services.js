import pool from "../config/db.js";
/**
 * 
 * @param {Object} urlParams - The Object from the middleware as req.userQuery
 * @param {String} tableName - Column name to insert into
 * @returns 
 */
export default async function getAll(urlParams, tableName) {

	const client = await pool.connect();
	try {
		const fieldCheckQuery =
			`SELECT CASE WHEN EXISTS (SELECT * FROM (SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}' AND table_schema = 'public' ORDER BY ordinal_position) WHERE column_name ='${urlParams.field}') THEN 1 ELSE 0 END AS existscheck`
		const fieldCheckQueryResult = await client.query(fieldCheckQuery)

		const urlParamFieldExists = fieldCheckQueryResult.rows[0].existscheck

		if (urlParamFieldExists == true) {
			const query = [
				`SELECT * FROM`,
				tableName,
				`ORDER BY ${urlParams.field} ${urlParams.sort} LIMIT`,
				urlParams.limit,
				`OFFSET ${urlParams.offset}`].join(" ")
			const queryResult = await client.query(query)
			return queryResult.rows;
		} else {
			const query = [
				`SELECT * FROM`,
				tableName,
				`ORDER BY id ${urlParams.sort} LIMIT`,
				urlParams.limit,
				`OFFSET ${urlParams.offset}`].join(" ")
			const queryResult = await client.query(query)
			return queryResult.rows;
		}

	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}