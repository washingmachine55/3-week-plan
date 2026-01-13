import pool from "../../config/db.js";
import addNewAddress from "../addresses/addNewAddress.addresses.services.js";


export default async function createNewStore(req) {

	const store_name = req.body.store_info.name
	const timezone = req.body.store_info.timezone
	const opening_hours = req.body.store_info.opening_hours
	const closing_hours = req.body.store_info.closing_hours


	const client = await pool.connect();
	try {
		try {
			if (!req.body.store_address) {
				throw new Error("Store Address is mandatory");
			} else {
				const saveStoreAddress = addNewAddress(req.body.store_address);
				if (!saveStoreAddress) {
					throw new Error("Could not save the address");
				} else {
					const savedAddressId = Object.values(await saveStoreAddress)[0]

					const query = {
						name: 'add-new-store',
						text: 'INSERT INTO stores (name, addresses_id, timezone, opening_hours, closing_hours) VALUES ($1,$2,$3,$4,$5) RETURNING *',
						values: [store_name, savedAddressId, timezone, opening_hours, closing_hours],
					}

					const queryResult = await client.query(query)

					return queryResult
				}
			}
		} catch (error) {
			console.debug(error)
		}
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}