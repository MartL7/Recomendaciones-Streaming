import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME  } from '../config.js'

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
}

export const conection = await mysql.createConnection(config)