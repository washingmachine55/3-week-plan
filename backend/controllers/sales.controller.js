import createNewSale from "../services/sales/createNewSale.sales.services.js"
import getAllSales from "../services/sales/getAllSalesAndProducts.sales.services.js";

export async function create(req,res) {
	try {
		const result = await createNewSale(req);

		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function read(req,res) {
	try {
		const result = await getAllSales(req);

		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function update(req,res) {
	try {
		res.json({
			status: 200,
		})
	} catch (error) {
		console.debug(error)
	}
}

export async function remove(req,res) {
	try {
		res.json({
			status: 200,
		})
	} catch (error) {
		console.debug(error)
	}
}