import { createNewCategory, setCategoryRelation } from "../services/categories/createNew.categories.services.js"

export async function createCategory(req, res) {
	try {
		const result = await createNewCategory(req)
		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function createCategoryRelation(req, res) {
	try {
		const result = await setCategoryRelation(req)
		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function read(req, res) {
	try {
		res.json({
			status: 200,
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