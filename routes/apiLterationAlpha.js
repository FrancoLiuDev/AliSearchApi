var express = require('express');
var router = express.Router();
var dbAliResult = require('../models/aliTask');

var bodyParser = require('body-parser');
app = express()

/*
 * GET userlist.
 */

//取得搜尋結果
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

//增加商品廠商到(查詢廠商清單)
router.put('/addQueryProvier', function (req, res) {
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

//新增廠fav_company (廠商清單)
router.put('/addFavOfferIds', function (req, res) {
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


//新增搜尋結果到(搜尋結果列表清單)
router.post('/searchresult', function (req, res) {
    console.log(req.headers);
    console.log(req.body);
    var metadata = req.body

    console.log('metadata', metadata)
    dbAliResult.addSearchResult(metadata, function (err, rows) {

        if (err) {
            res.sendStatus(400)
        }
        else {
            res.sendStatus(201)
        }
    });

});


//取得(搜尋結果列表清單)
router.get('/searchresult', function (req, res) {

    dbAliResult.getSearchResultList(function (err, rows) {

        if (err) {
            res.sendStatus(400)
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



//取得(搜尋結果列表清單)
router.get('/favprovider', function (req, res) {

    dbAliResult.getFavProviders(function (err, rows) {
        if (err) {
            res.sendStatus(400)
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


//取得單比(搜尋結果列表清單)'/user/:id/docs'
router.get('/offerlist/:id', function (req, res) {
    var id = req.params.id;

    dbAliResult.getOfferListByNickName(id, function (err, rows) {
        if (err) {
            res.sendStatus(400)
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


//取得單比(搜尋結果列表清單)'/user/:id/docs'
router.get('/favprovider/:id', function (req, res) {
    var id = req.params.id;

    dbAliResult.getFavProviderByNickName(id, function (err, rows) {
        if (err) {
            res.sendStatus(400)
        }
        else {
            var result = {
                data: rows[0]
            }
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