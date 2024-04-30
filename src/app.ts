import 'dotenv/config'
import express from 'express'
import connect from './utils/connect'
import router from './routes'
import deserializeUser from './middleware/deserializeUser'

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use(deserializeUser)

app.use(router)

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`)

  await connect()
})
