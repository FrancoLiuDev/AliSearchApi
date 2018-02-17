const Sequelize = require("sequelize")
let config = require(__config + "/productDbCfg")
let msproductDb = null

const createDbConn = function() {
	const sequelize = new Sequelize("dd_product", config.user, config.pwd, {
		host: config.host,
		dialect: "mysql", //choose anyone between them

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
module.exports = msproductDb
