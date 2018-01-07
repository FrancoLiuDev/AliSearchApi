var db = require("../dbconnection")

var uuid = require("uuid")
var dbSearchResult = {
	getSearchResult: function(searchkey, condition, callback) {
		var query =
			"SELECT COUNT(*) AS RecordCount FROM " +
			searchkey +
			" " +
			condition +
			";" +
			"SELECT *,IF(T.tc IS NULL, FALSE, TRUE) as qcompany ,IF(I.ti IS NULL, FALSE, TRUE) as qitem FROM " +
			searchkey +
			" " +
			"LEFT JOIN (SELECT companyNickname AS tc FROM alibaba.query_company) AS T ON (T.tc = " +
			searchkey +
			".companyNickname) " +
			"LEFT JOIN (SELECT offerId AS ti FROM alibaba.searchlike) AS I ON (I.ti = " +
			searchkey +
			".offerId) " +
			condition +
			";"
		console.log("query", query)
		return db.query(query, callback)
	},
	putQueryProvider: function(searchkey, offerid, callback) {
		var idstr = ""
		for (idx in offerid) {
			id = offerid[idx]
			if (idx == 0) idstr = "offerId =" + "'" + id + "'"
			else idstr += " OR offerId = " + "'" + id + "'"
		}
		var query =
			"INSERT INTO  alibaba.query_company (companyNickname, store_url, companyCreditLink,companyId)" +
			"SELECT  companyNickname,companyLink,companyCreditLink,companyId FROM " +
			searchkey +
			" " +
			"WHERE " +
			idstr +
			" " +
			"ON DUPLICATE KEY UPDATE companyId = VALUES(companyId)"

		//console.log('query', query)
		return db.query(query, callback)
	},
	putQueryOffer: function(offerId, callback) {
		var query =
			"INSERT INTO  alibaba.query_likes (offerId)" +
			" VALUES ('" +
			offerId +
			"')"
		;(" ON DUPLICATE KEY UPDATE offerId = VALUES(offerId)")

		return db.query(query, callback)
	},

	putFavOffer: function(searchkey, offerid, callback) {
		var idstr = ""
		for (idx in offerid) {
			id = offerid[idx]
			if (idx == 0) idstr = "offerId =" + id
			else idstr += " OR offerId = " + id
		}
		var query =
			"INSERT INTO  alibaba.searchlike " +
			"SELECT  * FROM " +
			searchkey +
			" " +
			"WHERE " +
			idstr +
			" " +
			"ON DUPLICATE KEY UPDATE offerId = VALUES(offerId)"

		console.log("query", query)
		return db.query(query, callback)
	},
	getFavOffer: function(callback) {
		var query =
			"SELECT COUNT(*) AS RecordCount FROM alibaba.searchlike; SELECT *,IF(T.tc IS NULL, FALSE, TRUE) as qcompany FROM alibaba.searchlike " +
			"LEFT JOIN (SELECT companyNickname AS tc FROM alibaba.query_company) AS T ON (T.tc = alibaba.searchlike.companyNickname)"
		return db.query(query, callback)
	},
	addSearchResult: function(metadata, callback) {
		var name = metadata.name
		var keyword = metadata.keyword
		var uid = uuid.v1().replace(/-/g, "_")
		var query = ""

		console.log("name", name)
		console.log("keyword", keyword)
		var uidName = name + "_" + uid
		var tName = "alisearch." + uidName

		const promise = new Promise(function(resolve, reject) {
			query = "CREATE TABLE " + tName + " LIKE alibaba.searchbyitem"
			console.log("query", query)

			db.query(query, function(err, res1) {
				if (err) {
					reject(err)
					return
				}
				resolve("ok")
			})
			//resolve(value)
			// 失敗時
			//reject(value)
		})

		promise
			.then(value => {
				const crTable = new Promise(function(resolve, reject) {
					query = "INSERT " + tName + " SELECT * FROM  alibaba.searchbyitem"
					console.log("query", query)

					db.query(query, function(err, res2) {
						if (err) {
							reject(err)
							return
						}
						resolve("ok")
					})
				})

				crTable
					.then(value => {
						query =
							"INSERT INTO  alibaba.search_result_list" +
							" VALUES ('" +
							name +
							"','" +
							keyword +
							"','" +
							uidName +
							"')"
						console.log("query", query)

						db.query(query, function(err, res3) {
							if (err) {
								callback(err)
								return
							}
							callback(null, res3) // think 'return'
						})
					})
					.catch(err => console.log(err.message))
			})
			.catch(err => console.log(err.message))
	},
	getSearchResultList: function(callback) {
		var query =
			"SELECT COUNT(*) AS RecordCount FROM alibaba.search_result_list; SELECT * FROM alibaba.search_result_list "

		return db.query(query, callback)
	},
	getFavProviders: function(callback) {
		var query =
			"SELECT COUNT(*) AS RecordCount FROM alibaba.fav_company; SELECT * FROM alibaba.fav_company;"
		return db.query(query, callback)
	},
	getFavProviderByNickName: function(name, callback) {
		var querywhere = "where COMPANY_NICKNAME = '" + name + "'"
		var query = "SELECT * FROM alibaba.fav_company " + querywhere + ";"
		return db.query(query, callback)
	},
	getOfferListByNickName: function(name, callback) {
		var table = "aliprovider.offerlist_" + name
		var query =
			"SELECT COUNT(*) AS RecordCount FROM " +
			table +
			";SELECT *,IF(I.ti IS NULL, FALSE, TRUE) as qitem FROM " +
			table +
			" " +
			"LEFT JOIN (SELECT offerId AS ti FROM alibaba.searchlike) AS I ON (I.ti = " +
			table +
			".OFFER_ID) " +
			";"
		console.log(query)
		return db.query(query, callback)
	},
	getOfferItemDetail: function(id, callback) {
		var querywhere = "where offer_id = '" + id + "'"
		var query = "SELECT * FROM alibaba.fav_offer_items " + querywhere + ";"
		return db.query(query, callback)
	},
	getOfferDetailList: function(callback) {
		var query =
			"SELECT COUNT(*) AS RecordCount FROM alibaba.fav_offer_items ; SELECT * FROM alibaba.fav_offer_items ;"
		return db.query(query, callback)
	}
}
module.exports = dbSearchResult
