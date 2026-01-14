import pool from "../../config/db.js";

export async function createNewCategory(req) {
	
	const categoryName = req.body.name;

	const client = await pool.connect();
	try {
		const query = {
			name: 'create-new-category',
			text: 'INSERT INTO categories (name) VALUES ($1) RETURNING *',
			values: [categoryName],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}

export async function setCategoryRelation(req) {
	
	const parentCategory = req.body.parent_category;
	const childCategory = req.body.child_category;

	const client = await pool.connect();
	try {
		let queryToGetCategoryId = {
			name: 'get-category-id-from-category-name',
			text: 'SELECT id FROM categories WHERE name = $1',
			values: [parentCategory],
		}
		const parentCategoryQueryResult = await client.query(queryToGetCategoryId)


		queryToGetCategoryId = {
			name: 'get-category-id-from-category-name',
			text: 'SELECT id FROM categories WHERE name = $1',
			values: [childCategory],
		}
		const childCategoryQueryResult = await client.query(queryToGetCategoryId)

		const query = {
			name: 'create-new-category-relation',
			text: 'INSERT INTO categories_treepaths (anecestor_id, descendant_id) VALUES ($1, $2) RETURNING *',
			values: [parentCategoryQueryResult.rows[0].id, childCategoryQueryResult.rows[0].id],
		}

		const queryResult = await client.query(query)

		return queryResult.rows;
	} catch (error) {
		console.log(error)
	} finally {
		client.release()
	}
}