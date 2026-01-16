
export default async function validateQueryGetAll(req, res, next) {
	const allowedSorts = ['ASC', 'DESC'];
	const sort = allowedSorts.includes(req.query.sort?.toUpperCase())
		? req.query.sort.toUpperCase()
		: 'ASC';

	const offset = Number(req.query.offset) || 0;

	const limit = Number(req.query.limit) || 10;

	const allowedFields = ['addresses_id', 'ancestor_id', 'archived_at', 'categories_id', 'city', 'closing_hours', 'cost_price', 'created_at', 'customers_id', 'date', 'date_cost_price', 'date_hire', 'date_membership_start', 'date_retail_price', 'date_termination', 'descendant_id', 'description', 'email', 'employees_id', 'first_name', 'id', 'is_closed', 'last_name', 'name', 'opening_hours', 'permissions_id', 'postal_zip', 'products_id', 'products_price_id', 'qty_change', 'reason', 'region', 'retail_price', 'returns_id', 'role_id', 'roles_id', 'sales_id', 'sku', 'stores_id', 'street_name', 'street_name_2', 'street_num', 'timestamp', 'timezone', 'total']

	const field = allowedFields.includes(req.query.orderby)
		? req.query.orderby
		: 'id';

	const queryDefaults = { sort: sort, limit: limit, offset: offset, field: field }

	try {
		req.userQuery = queryDefaults
		next()
	} catch (error) {
		console.log(error);
	}

}