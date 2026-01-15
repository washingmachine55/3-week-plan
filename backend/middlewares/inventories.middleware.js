import z from "zod";
import { InventoryTransactionSchema } from "../validations/validations.schema.js";

export async function validateInventoriesInput(req, res, next) {
	const stores_id = req.body.inventories_info.stores_id
	const products_id = req.body.inventories_info.products_id
	const sales_id = req.body.inventories_info.sales_id
	const returns_id = req.body.inventories_info.returns_id
	const reason = req.body.inventories_info.reason
	const timestamp = req.body.inventories_info.timestamp
	const qty_change = req.body.inventories_info.qty_change
	const employees_id = req.body.inventories_info.employees_id
	const customers_id = req.body.inventories_info.customers_id

	const inputToValidate = {
		"stores_id": stores_id,
		"products_id": products_id,
		"sales_id": sales_id,
		"returns_id": returns_id,
		"reason": reason,
		"timestamp": timestamp,
		"qty_change": qty_change,
		"employees_id": employees_id,
		"customers_id": customers_id
	}

	const validationResult = await InventoryTransactionSchema.safeParseAsync(inputToValidate)

	if (!validationResult.success) {
		return res.json({
			status: 200,
			message: "Validation failed",
			data: z.flattenError(validationResult.error).fieldErrors
		});
	} else {
		next()
	}
}
