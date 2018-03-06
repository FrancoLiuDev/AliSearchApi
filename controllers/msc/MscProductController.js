const MscController = require(__controllers + "/msc/MscController")
const MscProductModule = require("../module/mscProductModule")
let mscProductModule = new MscProductModule()

class MscProductController extends MscController {
	constructor() {
		super()
	}
	readProductItem(id) {
		return mscProductModule.readProductItem(id)
	}
	readFasionProductList() {
		return mscProductModule.readFasionProductList()
	}
}


module.exports = MscProductController
