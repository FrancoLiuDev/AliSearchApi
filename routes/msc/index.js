// var express = require("express")
// var router = express.Router()
// var bodyParser = require("body-parser")

// router.get("/msc/api/v1/product", function(req, res) {
// 	console.log("mscApiModule api")
// 	res.status(200).send("param")
// })

module.exports = mscApi

function mscApi(app) {
	console.log("mscApi")

	//建築列表
	app.get("/msc/api/v1/product", function(req, res) {
		console.log("get /msc/api/v1/product")
		res.status(200).json("body")
	})
}
