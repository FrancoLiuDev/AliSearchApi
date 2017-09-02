
var db = require('../dbconnection');

var dbSearchResult = {

    getSearchResult: function (query, callback) {

        //"SELECT COUNT(*) FROM searchbyitem; Select * from searchbyitem;"

        return db.query(query, callback);
        //SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;
    },

};
module.exports = dbSearchResult;