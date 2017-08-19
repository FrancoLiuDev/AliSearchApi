
var db = require('../dbconnection');

var dbSearchResult = {

    getSearchResult: function (callback) {

        //"SELECT COUNT(*) FROM searchbyitem; Select * from searchbyitem;"

        return db.query("SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;", callback);

    },

};
module.exports = dbSearchResult;