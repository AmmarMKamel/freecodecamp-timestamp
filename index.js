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
 * Route handler for the "/api/:date" endpoint.
 * Returns a JSON object with the Unix timestamp and UTC formatted date of
 * either the specified date parameter or the current time if no parameter
 * is passed.
 *
 * @route GET /api/:date
 * @param {string} req.params.date - The date string (ISO format) or timestamp (Unix)
 * @returns {Object} 200 - An object with the Unix timestamp and UTC string
 */
app.get("/api/:date?", (req, res) => {
	// Declare date variable
	let date;

	if (!req.params.date) {
		return res.status(200).json({
			unix: new Date().getTime(),
			utc: new Date().toUTCString(),
		});
	}

	// Check if req.params.date is NaN
	if (isNaN(req.params.date)) {
		// If true, create new date object from req.params.date
		date = new Date(req.params.date);
		if (!date.getTime())
			return res.status(400).json({ error: "Invalid Date" });
	} else {
		// If false, req.params.date is a Unix timestamp and should be converted to a number
		date = new Date(Number(req.params.date));
	}

	// Extract Unix timestamp from date object
	const unixTimestamp = date.getTime();
	// Format date object to UTC string
	const utcFormattedDate = date.toUTCString();

	// Send response with 200 status and JSON object containing Unix timestamp and UTC string
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
