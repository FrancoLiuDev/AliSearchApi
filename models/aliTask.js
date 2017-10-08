
var db = require('../dbconnection');

var uuid = require('uuid');
var dbSearchResult = {

    getSearchResult: function (query, callback) {
        return db.query(query, callback);
        //SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;
    },
    putQueryProvider: function (offerid, callback) {

        var idstr = ""
        for (idx in offerid) {
            id = offerid[idx]
            if (idx == 0)
                idstr = "companyId =" + id
            else
                idstr += " OR companyId = " + id
        }
        var query = "INSERT INTO  alibaba.query_company (companyNickname, store_url, companyCreditLink,companyId)" +
            "SELECT  companyNickname,companyLink,companyCreditLink,companyId FROM alibaba.searchbyitem "
            + "WHERE " + idstr + " " + "ON DUPLICATE KEY UPDATE companyId = VALUES(companyId)"

        //console.log('query', query)
        return db.query(query, callback);
    },
    putFavOffer: function (offerid, callback) {

        var idstr = ""
        for (idx in offerid) {
            id = offerid[idx]
            if (idx == 0)
                idstr = "companyId =" + id
            else
                idstr += " OR companyId = " + id
        }
        var query = "INSERT INTO  alibaba.searchlike *" +
            "SELECT  * FROM alibaba.searchbyitem "
            + "WHERE " + idstr + " " + "ON DUPLICATE KEY UPDATE companyId = VALUES(companyId)"

        //console.log('query', query)
        return db.query(query, callback)
    },
    addSearchResult: function (metadata, callback) {
        var name = metadata.name
        var keyword = metadata.keyword
        var uid = uuid.v1().replace(/-/g, "_")
        var query = ''

        console.log('name', name)
        console.log('keyword', keyword)
        var uidName = name + "_" + uid
        var tName = "alisearch." + uidName

        query = "CREATE TABLE " + tName + " LIKE alibaba.searchbyitem"
        console.log('query', query)

        db.query(query, function (err, res1) {
            if (err) {
                callback(err);
                return;
            }
        })

        query = "INSERT " + tName + " SELECT * FROM  alibaba.searchbyitem"
        console.log('query', query)

        db.query(query, function (err, res2) {
            if (err) {
                callback(err);
                return;
            }
        })


        query = "INSERT INTO  alibaba.search_result_list" +
            " VALUES ('" + name + "','" + keyword + "','" + uidName + "')"
        console.log('query', query)

        db.query(query, function (err, res3) {
            if (err) {
                callback(err)
                return
            }
            callback(null, res3); // think 'return'
        })




    },
    getSearchResultList: function (callback) {
        var query = "SELECT COUNT(*) AS RecordCount FROM alibaba.search_result_list; SELECT * FROM alibaba.search_result_list"
        return db.query(query, callback);
    },
    getFavProviders: function (callback) {
        var query = "SELECT COUNT(*) AS RecordCount FROM alibaba.fav_company; SELECT * FROM alibaba.fav_company;"
        return db.query(query, callback);
    },
    getFavProviderByNickName: function (name, callback) {
        var querywhere = "where COMPANY_NICKNAME = '" + name + "'";
        var query = "SELECT * FROM alibaba.fav_company " + querywhere + ";"
        return db.query(query, callback);
    },
    getOfferListByNickName: function (name, callback) {

        var table = "aliprovider.offerlist_" + name
        var query = "SELECT COUNT(*) AS RecordCount FROM " + table + ";SELECT * FROM " + table + ";"
        return db.query(query, callback);
    },
};
module.exports = dbSearchResult;