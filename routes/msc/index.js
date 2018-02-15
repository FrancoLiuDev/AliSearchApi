const MscProductController = require(__controllers +
	"./msc/MscProductController")
const mscProductController = new MscProductController()

module.exports = mscApi

function mscApi(app, config) {
	console.log("mscApi")

	mscProductController.init()
	//建築列表
	app.get("/msc/api/v1/product/:id", function(req, res) {
		var id = req.params.id
		console.log("get /msc/api/v1/product id" + id)
		mscProductController
			.readProductItem(id)
			.then(data => {
				console.log("data = ", data)
				res.status(200).json("body")
			})
			.catch(err => console.log(err))
	})
}
