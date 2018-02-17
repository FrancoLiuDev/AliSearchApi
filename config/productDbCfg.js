const genProductConfig = function() {
	console.log("DB_IPADDR", process.env.DB_IPADDR)

	var dbHost = "localhost"

	if (process.env.DB_IPADDR) {
		dbHost = process.env.DB_IPADDR
	}

	return {
		host: dbHost,
		user: "root",
		pwd: "123456"
	}
}

dbconfig = genProductConfig()
module.exports = dbconfig
