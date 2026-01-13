import createPermission from "../services/roles_permissions/permissions.roles_permissions.services.js";
import createRole from "../services/roles_permissions/roles.roles_permissions.services.js"

export async function createNewRole(req, res) {
	try {
		const newlyCreatedRole = await createRole(req);
		const responseMessage = (newlyCreatedRole == false) ? 'Role already exists' : 'Role created Successfully!'
		res.json({
			status: 200,
			message: responseMessage,
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function createNewPermissions(req, res) {
	try {
		const newlyCreatedPermissions = await createPermission(req);
		const arr = Object.values(newlyCreatedPermissions)
		const count = arr.filter(word => word === 'rejected').length;

		let responseMessage = ''
		if (count === arr.length) {
			responseMessage = 'All Permissions already exist'
		} else if (count < arr.length && count >= 1 ) {
			responseMessage = 'Some Permission(s) already exist'
		} else {
			responseMessage = 'All Permissions created successfully'
		}

		res.json({
			status: 200,
			message: responseMessage,
			data: newlyCreatedPermissions
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