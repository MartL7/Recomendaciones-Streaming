import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbContent'
}

export const conection = await mysql.createConnection(config)