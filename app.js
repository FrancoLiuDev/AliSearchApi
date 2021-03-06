var express = require("express")
var path = require("path")
var favicon = require("serve-favicon")
var logger = require("morgan")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var cors = require("cors")
var mscApi = require("./routes/msc/index")
var apiLteration = require("./routes/apiLterationAlpha")
var app = express()

app.use(cors())
app.use(logger("dev"))
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "1mb"
	})
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.set("view engine", "jade")

//
// Make our db accessible to our router
app.use(function(req, res, next) {
	//req.db = db;
	next()
})

//app.use('/', routes);
app.use("/api/v1", apiLteration)
mscApi(app)
//app.use("/msc", mscApi)
//app.use('/v1', apiLterationAlpha);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found")
	err.status = 404
	next(err)
})

/// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
		res.render("error", {
			message: err.message,
			error: err
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render("error", {
		message: err.message,
		error: {}
	})
})

module.exports = app
