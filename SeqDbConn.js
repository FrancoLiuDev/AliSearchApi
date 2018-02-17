const Sequelize = require("sequelize")
let msproductDb = null

const createDbConn = function() {
	console.log("msproductDb", msproductDb)
	const sequelize = new Sequelize("dd_product", "root", "123456", {
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
	return sequelize
}
msproductDb = createDbConn()
console.log("sequelize", msproductDb)

class SeqDatabaseConfig {
	constructor() {
		this._productSequelize = msproductDb
	}
	get productSequelize() {
		return this._productSequelize
	}
	static configFactory() {
		return new SeqDatabaseConfig()
	}
}

class SeqDatabase {
	static seqConfig() {
		return SeqDatabaseConfig.configFactory()
	}
}

module.exports = SeqDatabase
