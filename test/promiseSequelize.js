const apppath = require("../apppath")
const { msproductDb } = require(__base + "/SeqDbConn")
const MscProductController = require(__controllers + "/MscProductController")
const mscProductController = new MscProductController()

console.log("msproductDb", msproductDb)

// mscProductController
// 	.readProductItem("id")
// 	.then(data => {
// 		console.log("data = ", data)
// 	})
// 	.catch(err => console.log(err))
