import createNewInventoryTransaction from "../services/inventories/createNewTransaction.inventories.services.js"
import patchSingle from "../services/updateSingle.services.js";
import softDeleteSingle from "../services/archiveSingle.services.js"
import getAll from "../services/getAll.services.js";


export async function create(req, res) {
	try {
		const result = await createNewInventoryTransaction(req);

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
		const result = await getAll(req);

		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}
export async function update(req, res) {
	try {
		const result = await patchSingle(
			req.params.id,
			req.body.inventories_info,
			"inventories_transactions"
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
			"inventories_transactions"
		);
		res.json({
			status: 200,
			message: result
		})
	} catch (error) {
		console.debug(error)
	}
}