import z from "zod";
import { UUID } from "../validations/validations.schema.js";

export async function validateUuidUrlParam(req, res, next) {
	const inputToValidate = req.params.id

	const validationResult = await UUID.safeParseAsync(inputToValidate)

	if (!validationResult.success) {
		return res.json({
			status: 200,
			message: "Validation failed",
			data: z.flattenError(validationResult.error).formErrors
		});
	} else {
		next()
	}
}
