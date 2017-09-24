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
            var result = {
                data: {
                    count: rows[0][0].RecordCount,
                    rows: rows[1],
                }
            }
            res.json(result);
        }

    });

});


router.put('/addQueryProvier', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    var idlist = req.body.data

    console.log('idlist', idlist)
    dbAliResult.putQueryProvider(idlist, function (err, rows) {

        if (err) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(201)
        }
    });

});


router.put('/addFavOfferIds', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    var idlist = req.body.data

    console.log('idlist', idlist)
    dbAliResult.putFavOffer(idlist, function (err, rows) {

        if (err) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(201)
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