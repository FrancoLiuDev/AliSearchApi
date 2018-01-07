var express = require("express")
var router = express.Router()
var dbAliResult = require("../models/aliTask")

var bodyParser = require("body-parser")
app = express()

/*
 * GET userlist.
 */

//取得搜尋結果
router.post("/searchitems/:key", function(req, res) {
	console.log(req.headers)
	console.log(req.body)
	var query = req.body.query
	var key = req.params.key
	console.log("query", query)
	dbAliResult.getSearchResult(key, query, function(err, rows) {
		if (err) {
			res.json(err)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

//增加商品廠商到(查詢廠商清單)
router.put("/addQueryProvier/:key", function(req, res) {
	var idlist = req.body.data
	console.log("idlist", idlist)
	var key = req.params.key
	dbAliResult.putQueryProvider(key, idlist, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			res.sendStatus(201)
		}
	})
})

//增加商品廠商到(查詢廠商清單)
router.put("/addQueryOffer/:key", function(req, res) {
	var key = req.params.key
	dbAliResult.putQueryOffer(key, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			res.sendStatus(201)
		}
	})
})

//新增商品到我的最愛清單 (廠商清單)
router.put("/addFavOfferIds/:key", function(req, res) {
	var idlist = req.body.data
	var key = req.params.key
	console.log("idlist", idlist)
	dbAliResult.putFavOffer(key, idlist, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			res.sendStatus(201)
		}
	})
})

//取得我的最愛清單 (廠商清單)
router.get("/FavOfferIds", function(req, res) {
	dbAliResult.getFavOffer(function(err, rows) {
		if (err) {
			res.json(err)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

//新增搜尋結果到(搜尋結果列表清單)
router.post("/searchresult", function(req, res) {
	console.log(req.headers)
	console.log(req.body)
	var metadata = req.body

	console.log("metadata", metadata)
	dbAliResult.addSearchResult(metadata, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			res.sendStatus(201)
		}
	})
})

//取得(搜尋結果列表清單)
router.get("/searchresult", function(req, res) {
	dbAliResult.getSearchResultList(function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

//取得(搜尋結果列表清單)
router.get("/favprovider", function(req, res) {
	dbAliResult.getFavProviders(function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

//取得單比(搜尋結果列表清單)'/user/:id/docs'
router.get("/offerlist/:id", function(req, res) {
	var id = req.params.id

	dbAliResult.getOfferListByNickName(id, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

//取得單比(搜尋結果列表清單)'/user/:id/docs'
router.get("/favprovider/:id", function(req, res) {
	var id = req.params.id

	dbAliResult.getFavProviderByNickName(id, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: rows[0]
			}
			res.json(result)
		}
	})
})

//取得單比(商品細節)
router.get("/offerdetail/:id", function(req, res) {
	var id = req.params.id

	dbAliResult.getOfferItemDetail(id, function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: rows[0]
			}
			res.json(result)
		}
	})
})

//取得(商品細節)清單
router.get("/offerdetail/", function(req, res) {
	dbAliResult.getOfferDetailList(function(err, rows) {
		if (err) {
			res.sendStatus(400)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			res.json(result)
		}
	})
})

module.exports = router
