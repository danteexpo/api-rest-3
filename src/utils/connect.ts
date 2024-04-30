import 'dotenv/config'
import mongoose from 'mongoose'

const connect = async () => {
  const dbUri = process.env.DB_URI as string

  try {
    await mongoose.connect(dbUri)
    console.log('DB connected')
  } catch (e) {
    console.error('Could not connect to DB')
    process.exit(1)
  }
}

export default connect
