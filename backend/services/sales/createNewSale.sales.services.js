import pool from "../../config/db.js";

export default async function createNewSale(req) {
	
	const stores_id = req.body.sale_info.stores_id
	const employees_id = !req.body.sale_info.employees_id ? null : req.body.sale_info.employees_id;
	const customers_id = !req.body.sale_info.customers_id ? null : req.body.sale_info.customers_id;
	const total = req.body.sale_info.total

	const products_prices_array = Object.values(req.body.sale_details);

	const client = await pool.connect();
	try {
		const querySale = {
			name: 'create-new-sale',
			text: 'INSERT INTO sales (stores_id, employees_id, customers_id, total) VALUES ($1,$2,$3,$4) RETURNING *',
			values: [stores_id, employees_id, customers_id, total],
		}
		const querySaleResult = await client.query(querySale)

		const sales_id = querySaleResult.rows[0].id

		let queryArray = [];
		products_prices_array.forEach(element => {
			let querySaleProducts = {
				name: 'add-sale-products',
				text: 'INSERT INTO products_sales (sales_id, products_price_id) VALUES ($1,$2) RETURNING *',
				values: [sales_id, element.products_price_id],
			}			
			return queryArray.push(querySaleProducts)
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

		const pairs = products_prices_array.map((key, index) => [key.products_price_id, loopResults[index]]);

		const combinedObject = Object.fromEntries(pairs);
		return combinedObject
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}