import pool from "../../config/db.js";

export async function getRoles(req) {
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

export default async function createRole(req) {
	const role_name = req.body.name;

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-something',
			text: 'INSERT INTO roles (name) VALUES ($1)',
			values: [role_name],
		}

		const queryResult = await client.query(query)

		if (!queryResult) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.log(error)
		return false;
	} finally {
		client.release()
	}
}