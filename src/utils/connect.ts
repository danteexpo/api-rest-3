import config from 'config'
import mongoose from 'mongoose'

const connect = async () => {
  const dbUri = config.get<string>('dbUri')
  try {
    await mongoose.connect(dbUri)
    console.log('DB connected')
  } catch (e) {
    console.error('Could not connect to DB')
    process.exit(1)
  }
}

export default connect
