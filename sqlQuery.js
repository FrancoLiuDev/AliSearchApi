var dbAliResult = require('./models/aliTask');

var query = 'SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;'
dbAliResult.getSearchResult(query, function (err, rows) {

    if (err) {
        res.json(err);
    }
    else {
        //SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;

        console.log(rows)

    }

});