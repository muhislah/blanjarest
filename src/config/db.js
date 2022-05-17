const connectionString = 'postgres://hjunlhdhavctjo:1dee3f9ff767e383211235514221724b019b2684a00f75196cff6716857f3481@ec2-54-165-184-219.compute-1.amazonaws.com:5432/d5arene10ff50t'
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: connectionString,
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl : true
})

module.exports = pool