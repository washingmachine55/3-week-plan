import pool from "../../config/db.js";

export default async function sampleTemplateFunctionThatDoesntDoAnythingLol(req) {
	
	const sample = req.body.sample;

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-something',
			text: 'INSERT INTO xyz_table (street_num) VALUES ($1) RETURNING *',
			values: [sample],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}