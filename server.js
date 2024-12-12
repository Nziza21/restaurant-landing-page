const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/reserve", (req, res) => {
    const { name, email, date, time, people } = req.body;
    console.log(`Reservation received:
      Name: ${name}
      Email: ${email}
      Date: ${date}
      Time: ${time}
      People: ${people}`);

    return res.status(200).json({
        message: `Reservation confirmed for ${name}. We look forward to hosting you on ${date} at ${time} for ${people} people.`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});