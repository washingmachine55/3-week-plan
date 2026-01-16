import pool from "../config/db.js"
import createNewStoreService from "../services/stores/createNewStore.stores.services.js"

export async function createNewStore(req, res) {
	try {
		const queryResult = await createNewStoreService(req)
		if (!queryResult) {
			throw new Error("Store could not be created");
		} else {
			res.json({
				status: 200,
				message: "Record created Successfully",
				data: queryResult.rows,
			})
		}
	} catch (error) {
		console.debug(error)
	}
}
export async function read(req, res) {
	const client = await pool.connect()
	try {
		const queryResult = await client.query('SELECT * FROM stores')
		res.json({
			status: 200,
			message: queryResult.rows,
		})
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}
export async function update(req, res) {
	try {
		res.json({
			status: 200,
		})
	} catch (error) {
		console.debug(error)
	}
}

export async function remove(req, res) {
	try {
		res.json({
			status: 200,
		})
	} catch (error) {
		console.debug(error)
	}
}