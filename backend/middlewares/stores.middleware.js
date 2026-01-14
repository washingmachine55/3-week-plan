import z from "zod";
import { AddressSchema, StoreSchema } from "../validations/validations.schema.js";

export async function validateStoresInput(req, res, next) {
	const name = req.body.store_info.name
	const timezone = req.body.store_info.timezone
	const opening_hours = req.body.store_info.opening_hours
	const closing_hours = req.body.store_info.closing_hours

	const street_num = req.body.store_address.street_num
	const street_name = req.body.store_address.street_name
	const street_name_2 = req.body.store_address.street_name_2
	const postal_zip = req.body.store_address.postal_zip
	const city = req.body.store_address.city
	const region = req.body.store_address.region

	const storeInfoInputToValidate = {
		"name": name,
		"timezone": timezone,
		"opening_hours": opening_hours,
		"closing_hours": closing_hours
	}
	const storeInfoValidationResult = await StoreSchema.safeParseAsync(storeInfoInputToValidate)

	const storeAddressInputToValidate = {
		"street_num": street_num,
		"street_name": street_name,
		"street_name_2": street_name_2,
		"postal_zip": postal_zip,
		"city": city,
		"region": region
	}
	const storeAddressValidationResult = await AddressSchema.safeParseAsync(storeAddressInputToValidate)
	
	if (!storeInfoValidationResult.success || !storeAddressValidationResult.success) {
		const StoreInfoFlattenedError = !storeInfoValidationResult.success
			? z.flattenError(storeInfoValidationResult.error).fieldErrors
			: storeInfoValidationResult

		const StoreAddressFlattenedError = !storeAddressValidationResult.success
			? z.flattenError(storeAddressValidationResult.error).fieldErrors
			: storeAddressValidationResult

		let dataForResponse = []
		dataForResponse.push(StoreInfoFlattenedError, StoreAddressFlattenedError)

		return res.json({
			status: 200,
			message: "Validation failed",
			data: dataForResponse
		});
	} else {
		next()
	}
}
