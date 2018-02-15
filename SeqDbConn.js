const Sequelize = require("sequelize")
let msproductDb = null

function createDbConn() {
	console.log("create db conn")
	msproductDb = require("mysql")

	const sequelize = new Sequelize("alibaba", "root", "123456", {
		host: "localhost",
		dialect: "mysql", //choose anyone between them

		// To create a pool of connections
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	})

	sequelize
		.authenticate()
		.then(() => {
			console.log("Connection has been established successfully.")
		})
		.catch(err => {
			console.log("Unable to connect to the database:", err)
		})
}

if (!msproductDb) {
	createDbConn()
}

exports.msproductDb = msproductDb
