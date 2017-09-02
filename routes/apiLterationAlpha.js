var express = require('express');
var router = express.Router();
var dbAliResult = require('../models/aliTask');

var bodyParser = require('body-parser');
app = express()

/*
 * GET userlist.
 */


router.post('/searchitems', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    var query = req.body.query

    console.log('query', query)
    dbAliResult.getSearchResult(query, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            //SELECT COUNT(*) AS RecordCount FROM searchbyitem; Select * from searchbyitem;
            var result = {
                data: {
                    count: rows[0][0].RecordCount,
                    rows: rows[1],
                }
            }
            //console.log(result)
            res.json(result);
        }

    });

});

/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id': userToDelete }, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
    });
});

module.exports = router;