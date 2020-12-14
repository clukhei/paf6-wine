const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(cors())
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const PORT =
	parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

const MONGO_URL = "mongodb://localhost:27017";
//same for the atlas connection

//create a client --pool
const mongoClient = new MongoClient(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.get("/countries", async (req, res) => {
	try {
		const result = await mongoClient
			.db("winemag")
			.collection("wine")
            .distinct("country")
            
            result.reverse()
            
        res.status(200)
        res.type("application/json");
        res.json(result)
		
	} catch (e) {
		console.log(e);
		res.type("application/json");
		res.status(500).json({ message: e });
	}
});

app.get("/country/:country", async (req, res) => {
	const country = req.params["country"];
	try {
		const result = await mongoClient
			.db("winemag")
			.collection("wine")
			.find({ country: { $regex: country, $options: "i" } })
			.sort({ province: 1 })
			.project({ title: 1, price: 1 })
			.limit(50)
			.toArray();
		res.status(200);
		res.type("application/json");
		res.json(result);
	} catch (e) {
		console.log(e);
		res.type("application/json");
		res.status(500).send({ message: e });
	}
});

app.use((req, res) => {
	res.redirect("/");
});

mongoClient
	.connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`${PORT} started`);
		});
	})
	.catch((e) => {
		console.error("Cannot connect to mongodb", e);
	});
