/* eslint-disable */ 

import z from "zod";
import {  } from "../validations/validations.schema.js";

export async function validate_______Input(req, res, next) {
	const name = req.body.employee_info.name
	const date_hire = req.body.employee_info.date_hire
	const date_termination = req.body.employee_info.date_termination

	const inputToValidate = {
		"name": name,
		"date_hire": date_hire,
		"date_termination": date_termination
	}

	const validationResult = await __Schema.safeParseAsync(inputToValidate)

	if (!validationResult.success) {
		return res.json({
			status: 200,
			message: "Validation failed",
			data: z.flattenError(validationResult.error).fieldErrors
		});
	} else {
		validationResult.data;    // { username: string; xp: number }
		next()
	}
}
