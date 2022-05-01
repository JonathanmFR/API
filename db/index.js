const mysql = require('mysql')

const connectionData = {
  host: 'localhost',
  user: 'u',
  password: 'root',
  database: 'tp_node_js',
}

let connection;

/**
 * Create or return already existing database instance
 *
 * @returns connection database instance
 */
const retrieveConnection = () => {
  if (!connection) {
    connection = mysql.createConnection(connectionData)
    connection.connect();
    connection.asyncQuery = async (query) => new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, fields })
      })
    })
  }

  return connection
}

module.exports = retrieveConnection 