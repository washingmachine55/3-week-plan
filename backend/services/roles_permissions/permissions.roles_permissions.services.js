import pool from "../../config/db.js";


export default async function createPermission(req) {
	const permissions_array = Object.values(req.body.permissions);

	const client = await pool.connect();
	try {
		let queryArray = [];
		permissions_array.forEach(element => {
			let query = {
				name: 'create-permission(s)',
				text: 'INSERT INTO permissions (name) VALUES ($1)',
				values: [element],
			}
			return queryArray.push(query);
		});

		let promises = []
		queryArray.forEach(element => {
			let miniPromise = client.query(element)
			promises.push(miniPromise)
		})

		const loopResults = []
		await Promise.allSettled(promises).then((results) =>
			results.forEach((result) => loopResults.push(result.status))
		)

		const pairs = permissions_array.map((key, index) => [key, loopResults[index]]);

		// Convert the array of pairs into a single object
		const combinedObject = Object.fromEntries(pairs);

		return combinedObject
	} catch (error) {
		console.log(error)
		return false;
	} finally {
		client.release()
	}
}