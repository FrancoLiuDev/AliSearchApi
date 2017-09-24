
var db = require('../dbconnection');

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

        console.log('query', query)
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

        console.log('query', query)
        return db.query(query, callback);
    },

};
module.exports = dbSearchResult;