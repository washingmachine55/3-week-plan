import { env, loadEnvFile } from 'node:process'
loadEnvFile();

import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send(`Hello from the ${env.APP_NAME}!`)
})

app.listen(port, () => {
	console.log(`${env.APP_NAME} listening on port ${port}`)
})