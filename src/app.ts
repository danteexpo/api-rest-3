import express from 'express'
import config from 'config'
import connect from './utils/connect'
import router from './routes'

const app = express()

const port = config.get<number>('port')

app.use(express.json())

app.use(router)

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`)

  await connect()
})
