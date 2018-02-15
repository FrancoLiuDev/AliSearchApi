const MscController = require(__routes + "/msc/controllers/MscController")

class MscProductController extends MscController {
	init() {}
	readProductItem(id) {
		return new Promise(function(resolve, reject) {
			resolve("data")
		})
	}
}

module.exports = MscProductController
