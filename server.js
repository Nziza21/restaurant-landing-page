const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// In memory array to store reservations
const reservations = [];

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Route to handle new reservations
app.post("/reserve", (req, res) => {
    const { name, email, date, time, people } = req.body;
    const newReservation = { name, email, date, time, people };
    reservations.push(newReservation);

    console.log("New Reservation Added:", newReservation);

    return res.status(200).json({
        message: `Reservation confirmed for ${name}. We look forward to hosting you on ${date} at ${time} for ${people} people.`,
    });
});

// Route to fetch all reservations
app.get("/reservations", (req, res) => {
    return res.status(200).json(reservations);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
