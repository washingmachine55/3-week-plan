import archiveSingle from "../services/products/archiveSingle.products.services.js";
import { createNewProduct } from "../services/products/createNewProduct.products.services.js"
import getAllProducts from "../services/products/getAllProducts.products.services.js"
import patchSingle from "../services/products/updateSingle.products.services.js";

export async function createProduct(req, res) {
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
		const queryResult = await getAllProducts(req)

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
		const queryResult = await patchSingle(req)

		res.json({
			status: 200,
			message: queryResult,
		})
	} catch (error) {
		console.debug(error)
	}
}

export async function remove(req, res) {
	try {
		const queryResult = await archiveSingle(req)

		res.json({
			status: 200,
			message: queryResult,
		})
	} catch (error) {
		console.debug(error)
	}
}