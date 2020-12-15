const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");
const mysql = require('mysql2/promise')

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/paf6-wine-frontend"));
const PORT =
  parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
  
  const pool = mysql.createPool({
    host: process.env.MYSQL_SERVER,
    port: process.env.MYSQL_SVR_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_SCHEMA,
    connectionLimit: process.env.MYSQL_CON_LIMIT,
  });
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
      .distinct("country");

    result.reverse();

    res.status(200);
    res.type("application/json");
    res.json(result);
  } catch (e) {
    console.log(e);
    res.type("application/json");
    res.status(500).json({ message: e });
  }
});

/* use winemag
db.getCollection('wine').find({_id: ObjectId("5fd70705f8ede11535949bcd")},{country: 1, description: 1, designation:1, points: 1, price:1, province: 1, taste_name: 1, title: 1, variety: 1, winery: 1}) */
app.get("/wine/:id", async (req, res) => {
  const wineId = req.params["id"];
  try {
    const result = await mongoClient
      .db("winemag")
      .collection("wine")
      .find({ _id: ObjectId(wineId) })
      .project({
        country: 1,
        description: 1,
        designation: 1,
        points: 1,
        price: 1,
        province: 1,
        taste_name: 1,
        title: 1,
        variety: 1,
        winery: 1,
      })
      .toArray();
    res.status(200);
    res.type("application/json");
    res.json(result);
  } catch (e) {
    console.log(e);
    res.type("application/json");
    res.status(500).json("server error");
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


  const startSQL = pool
    .getConnection()
    .then((conn) => {
      conn.ping();
      console.log("pinged");
      return conn
    })
    .then((conn) => conn.release());

Promise.all([mongoClient.connect(), startSQL])
  .then(()=> console.log(`Mongo and mysql started at PORT ${PORT}`));
// mongoClient
//   .connect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`${PORT} started`);
//     });
//   })
//   .catch((e) => {
//     console.error("Cannot connect to mongodb", e);
//   });
