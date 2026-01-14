import pool from "../../config/db.js";

export default async function createNewEmployee(req) {

	const date_hire = (!req.body.employee_info.date_hire || req.body.employee_info.date_hire == null)
		? new Date().toISOString()
		: req.body.employee_info.date_hire;

	const date_termination = (!req.body.employee_info.date_termination || req.body.employee_info.date_termination == null)
		? null
		: req.body.employee_info.date_termination

	const client = await pool.connect();
	try {
		if (!req.body.employee_info.name || req.body.employee_info.name == null || (req.body.employee_info.name).length == 0) {
			return "Employee name is mandatory"
		} else {
			const name = req.body.employee_info.name;

			const query = {
				name: 'create-new-employee',
				text: 'INSERT INTO employees (name, date_hire, date_termination) VALUES ($1,$2,$3) RETURNING *',
				values: [name, date_hire, date_termination],
			}

			const queryResult = await client.query(query)
			return queryResult.rows;
		}
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}