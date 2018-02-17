const apppath = require("../apppath")

const MscProductController = require(__controllers +
	"/msc/MscProductController")

const mscProductController = new MscProductController()

mscProductController
	.readProductItem(2)
	.then(data => {
		console.log("data = ", data)
	})
	.catch(err => console.log(err))

// mscProductController
// 	.readFasionProductList()
// 	.then(data => {
// 		console.log("list data = ", data)
// 	})
// 	.catch(err => console.log(err))
