import createNewEmployee from "../services/employees/createNew.employees.services.js"
import patchSingle from "../services/updateSingle.services.js"
import softDeleteSingle from "../services/archiveSingle.services.js"

export async function create(req, res) {
	try {
		const result = await createNewEmployee(req)
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
		// TODO: gotta fix this when i get home or by Friday's shift (16th Jan 2025)
		// const result = await getAll(req)
		res.json({
			status: 200,
			// message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function update(req, res) {
	try {
		const result = await patchSingle(
			req.params.id,
			req.body.employees_info,
			"employees"
		);
		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}

export async function remove(req, res) {
	try {
		const result = await softDeleteSingle(
			req.params.id,
			"employees"
		);
		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}