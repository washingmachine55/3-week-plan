import createNewEmployee from "../services/employees/createNew.employees.services.js"

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