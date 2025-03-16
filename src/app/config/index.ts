import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

// exporting config file
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  dev_environment: process.env.DEV_ENVIRONMENT,
  saltRounds: process.env.Salt_Rounds,
  secret: process.env.SECRET,
}
