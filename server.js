require("dotenv").config();
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("❌ API_KEY not found");
} else {
    console.log("✅ API_KEY loaded");
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

if (!fs.existsSync("orders")) {
    fs.mkdirSync("orders");
}

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/create-order", upload.single("receipt"), (req, res) => {

    const order = {

        id: Date.now(),

        game: req.body.game,

        package: req.body.package,

        playerId: req.body.playerId,

        telegram: req.body.telegram,

        paymentStatus: "NOT PAID",

        receipt: req.file ? req.file.filename : null

    };

    fs.writeFileSync(

        "orders/" + order.id + ".json",

        JSON.stringify(order, null, 2)

    );

    res.json({

        success: true,

        message: "Order Created",

        order

    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log("================================");

    console.log("E-KENZO GAME TOP UP");

    console.log("Server Running");

    console.log("http://localhost:" + PORT);

    console.log("================================");

});
