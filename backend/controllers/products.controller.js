import { createNewProduct } from "../services/products/createNewProduct.products.services.js"
import getAll from "../services/products/getAll.products.services.js"

export async function create(req, res) {
	try {
		const queryResult = await createNewProduct(req)
		if (!queryResult) {
			throw new Error("Product could not be created");
		} else {
			res.json({
				status: 200,
				message: queryResult,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
export async function read(req, res) {
	try {
		const queryResult = await getAll(req)

		res.json({
			status: 200,
			message: queryResult,
		})
	} catch (error) {
		console.debug(error)
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