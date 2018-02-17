const apppath = require("../apppath")
const msproductDb = require(__base + "/SeqDbConn")
console.log("msproductDb", msproductDb)
const MscProductController = require(__controllers +
	"/msc/MscProductController")

const mscProductController = new MscProductController()
mscProductController.init(msproductDb.seqConfig())

mscProductController
	.readProductItem("id")
	.then(data => {
		console.log("data = ", data)
	})
	.catch(err => console.log(err))
