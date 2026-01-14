import pool from "../../config/db.js";

export default async function getAllSales(req) {

	const allowedFields = ['store_name', 'cost_price', 'retail_price', 'created_at', 'product_name'];
	const allowedSorts = ['ASC', 'DESC'];
	// const allowedWithProducts = ['true', 'false'];

	const field = allowedFields.includes(req.query.field)
		? req.query.field
		: 'sales_id';

	const sort = allowedSorts.includes(req.query.sort?.toUpperCase())
		? req.query.sort.toUpperCase()
		: 'DESC';

	// const withProducts = allowedWithProducts.includes(req.query.products?.toUpperCase()) 
	// 	? req.query.products.toUpperCase() 
	// 	: 'FALSE';

	const limit = Number(req.query.limit) || 5;

	const client = await pool.connect();
	try {
		const queryResult = await client.query(`
			SELECT st.name AS "store_name", s.id AS sales_id, p.name AS "product_name", pp.cost_price, pp.retail_price
			FROM products_sales ps
			JOIN sales s ON s.id = ps.sales_id
			JOIN products_prices pp ON pp.id = ps.products_price_id
			JOIN products p ON pp.products_id = p.id
			JOIN stores st ON s.stores_id = st.id 
			ORDER BY ${field} ${sort}
			LIMIT $1`, [limit])

		return queryResult.rows;
	} catch (error) {
		console.debug(error)
	} finally {
		client.release()
	}
}



// const objectResultPair = []
// Object.values(queryResult.rows).forEach(element => {
// 	return objectResultPair.push(client.query(`SELECT * FROM products_sales WHERE sales_id = $1`, [element.sales_id]))
// });

// let promises = []
// Object.values(queryResult.rows).forEach(element => {
// 	let miniPromise = client.query(`SELECT * FROM products_sales WHERE sales_id = $1`, [element.sales_id])
// 	promises.push(miniPromise)
// })

// const loopResults = []
// await Promise.allSettled(promises).then((results) =>
// 	results.forEach((result) => loopResults.push(result.value.rows))
// )

// console.log(loopResults);

// const pairs = permissions_array.map((key, index) => [key, loopResults[index]]);

// // Convert the array of pairs into a single object
// const combinedObject = Object.fromEntries(pairs);

// return combinedObject