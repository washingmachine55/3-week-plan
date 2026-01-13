import pool from "../../config/db.js";

export default async function addNewAddress(req) {

	const street_num = req.street_num;
	const street_name = req.street_name;
	const street_name_2 = req.street_name_2;
	const postal_zip = req.postal_zip;
	const city = req.city;
	const region = req.region;	
	
	const client = await pool.connect();
	try {
		const query = {
			name: 'fetch-products',
			text: 'INSERT INTO addresses (street_num, street_name, street_name_2, postal_zip, city, region) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
			values: [street_num, street_name, street_name_2, postal_zip, city, region],
		}

		const queryResult = await client.query(query)

		return queryResult.rows[0];
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}