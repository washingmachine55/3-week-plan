import express from 'express'
import cors from 'cors'
import { env, loadEnvFile } from 'node:process'

loadEnvFile();
const app = express()
const port = 3000

app.use(express.json())

app.use(cors({
	origin: '*',
	credentials: false,
}))

app.set('query parser', 'simple')

import productsRoutes from "./routes/products.routes.js"
app.use("/products", productsRoutes)

import storesRoutes from "./routes/stores.routes.js"
app.use("/stores", storesRoutes)

import salesRoutes from "./routes/sales.routes.js"
app.use("/sales", salesRoutes)

import employeesRoutes from "./routes/employees.routes.js"
app.use("/employees", employeesRoutes)

import categoriesRoutes from "./routes/categories.routes.js"
app.use("/categories", categoriesRoutes)

import inventoriesRoutes from "./routes/inventories.routes.js"
app.use("/inventories", inventoriesRoutes)

import rbacRoutes from "./routes/rbac.routes.js"
app.use("/rbac", rbacRoutes)

app.get("/", (req, res) => {
	res.json({
		app_name: `${env.APP_NAME}`,
		apis_available: {
			stores: {
				URL: "http://localhost:3000/stores",
				used_for: "GET,POST,UPDATE,DELETE"
			},
			products: {
				URL: "http://localhost:3000/products",
				used_for: "GET,POST,UPDATE,DELETE",
				optional: "Get request has optional query parameters such as field, sort, and limit"
			},
		},
		url_query_parameter_defaults: {
			limit: '10',
			orderby: 'id',
			offset: '0',
			sort: 'ASC' 
		}
	});
})

app.use((req, res) => {
	res.status(404).json({
		status: 404,
		message: 'Page not found. Use the default root endpoint for a guide on available APIs.',
	});
});

app.listen(port, () => {
	console.log(`${env.APP_NAME} listening on port ${port}`)
})
