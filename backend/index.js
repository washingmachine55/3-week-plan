import express, { json } from 'express'
import cors from 'cors'
import { env, loadEnvFile } from 'node:process'

loadEnvFile();
const app = express()
const port = 3000

app.use(json())

app.use(cors({
	origin: '*',
	credentials: false,
}))

app.set('query parser', 'simple')

app.listen(port, () => {
	console.log(`${env.APP_NAME} listening on port ${port}`)
})

app.get('/', (req, res) => {
	res.send(`Hello from the ${env.APP_NAME}!`)
})


import productsRoutes from "./routes/products.routes.js"
app.use("/products", productsRoutes)

import storesRoutes from "./routes/stores.routes.js"
app.use("/stores", storesRoutes)

import employeesRoutes from "./routes/employees.routes.js"
app.use("/employees", employeesRoutes)

import categoriesRoutes from "./routes/categories.routes.js"
app.use("/categories", categoriesRoutes)

import rbacRoutes from "./routes/rbac.routes.js"
app.use("/rbac", rbacRoutes)



