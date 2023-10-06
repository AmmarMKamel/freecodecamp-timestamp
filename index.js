// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

/**
 * This function handles requests to the "/api/:date" endpoint.
 * It provides a JSON object that includes the Unix timestamp and
 * correctly formatted date in UTC. This date is either defined by the
 * date parameter, or is automatically set to the current time if not provided.
 *
 * @route GET /api/:date
 * @param {string} req.params.date - Represents the date. Should be in either ISO format or Unix timestamp.
 * @returns {Object} 200 - Returns an object that consists of the Unix timestamp and UTC date string.
 */
app.get("/api/:date?", (req, res) => {
	// Date variable declaration
	let date;

	// If no date is received, send current time
	if (!req.params.date) {
		return res.status(200).json({
			unix: new Date().getTime(),
			utc: new Date().toUTCString(),
		});
	}

	// Verifies if req.params.date is NaN
	if (isNaN(req.params.date)) {
		// On being true, a new Date object is acquired from req.params.date
		date = new Date(req.params.date);
		if (!date.getTime())
			// If invalid, return error
			return res.status(400).json({ error: "Invalid Date" });
	} else {
		// If not true, req.params.date is considered as a Unix timestamp and is converted to a number
		date = new Date(Number(req.params.date));
	}

	// Getting Unix timestamp from the date object
	const unixTimestamp = date.getTime();
	// Formating the date object into a UTC string
	const utcFormattedDate = date.toUTCString();

	// Response is sent with status 200 and a JSON object that contains the Unix timestamp and UTC string.
	res.status(200).json({ unix: unixTimestamp, utc: utcFormattedDate });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
