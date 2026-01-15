import pool from "../../config/db.js";

export default async function createNewInventoryTransaction(req) {
	
	const stores_id = req.body.inventories_info.stores_id
	const products_id = req.body.inventories_info.products_id
	const sales_id = req.body.inventories_info.sales_id
	const returns_id = req.body.inventories_info.returns_id
	const reason = req.body.inventories_info.reason
	const timestamp = req.body.inventories_info.timestamp
	const qty_change = req.body.inventories_info.qty_change
	const employees_id = req.body.inventories_info.employees_id
	const customers_id = req.body.inventories_info.customers_id

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-new-inventory-transaction',
			text: 'INSERT INTO inventories_transactions (stores_id, products_id, sales_id, returns_id, reason, timestamp, qty_change, employees_id, customers_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
			values: [stores_id, products_id, sales_id, returns_id, reason, timestamp, qty_change, employees_id, customers_id],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}