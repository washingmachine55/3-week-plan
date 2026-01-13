import pool from "../../config/db.js";

export async function createNewProduct(req) {

	const sku = req.body.product_info.sku
	const name = req.body.product_info.name
	const description = req.body.product_info.description
	const status = req.body.product_info.status
	const created_at = req.body.product_info.created_at
	const archived_at = req.body.product_info.archived_at

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-new-product',
			text: 'INSERT INTO products (sku, name, description, status, created_at, archived_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
			values: [sku, name, description, status, created_at, archived_at],
		}

		const queryResult = await client.query(query)

		if (!req.body.products_price) {
			return queryResult.rows;	
		} else {
			const product_id = queryResult.rows[0].id;

			const queryResultWithPrice = await createNewProductPrice(req, product_id)
			return [{ product_info: queryResult.rows }, {product_price: queryResultWithPrice}]
		}
	} catch (error) {
		console.log(error);
	} finally {
		client.release()
	}
}

export async function createNewProductPrice(req, products_id) {

	const cost_price = req.body.products_price.cost_price
	const date_cost_price = req.body.products_price.date_cost_price
	const retail_price = req.body.products_price.retail_price
	const date_retail_price = req.body.products_price.date_retail_price

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-new-product-price',
			text: 'INSERT INTO products_prices (products_id, cost_price, date_cost_price, retail_price, date_retail_price) VALUES ($1,$2,$3,$4,$5) RETURNING *',
			values: [products_id, cost_price, date_cost_price, retail_price, date_retail_price],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.log(error);
	} finally {
		client.release()
	}
}