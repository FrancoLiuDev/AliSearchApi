var express = require("express")
var router = express.Router()
var dbAliResult = require("../models/aliTask")
/*
 * GET userlist.
 */
router.get("/searchitems", function(req, res) {
	dbAliResult.getSearchResult(function(err, rows) {
		if (err) {
			res.json(err)
		} else {
			var result = {
				data: {
					count: rows[0][0].RecordCount,
					rows: rows[1]
				}
			}
			console.log(result)
			res.json(result)
		}
	})
})

/*
 * POST to adduser.
 */
router.post("/adduser", function(req, res) {
	var db = req.db
	var collection = db.get("userlist")
	collection.insert(req.body, function(err, result) {
		res.send(err === null ? { msg: "" } : { msg: err })
	})
})

/*
 * DELETE to deleteuser.
 */
router.delete("/deleteuser/:id", function(req, res) {
	var db = req.db
	var collection = db.get("userlist")
	var userToDelete = req.params.id
	collection.remove({ _id: userToDelete }, function(err) {
		res.send(err === null ? { msg: "" } : { msg: "error: " + err })
	})
})

module.exports = router
