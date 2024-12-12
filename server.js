const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve files from 'public'

// Endpoint to handle reservation submission
app.post("/reserve", (req, res) => {
    const { name, email, date, time, people } = req.body;

    // Here, you would typically store the reservation data in a database.
    // Since this is a mock, we'll just log it to the console.
    console.log(`Reservation received:
      Name: ${name}
      Email: ${email}
      Date: ${date}
      Time: ${time}
      People: ${people}`);

    // Return a response with the reservation details and confirmation
    return res.status(200).json({
        message: `Reservation confirmed for ${name}. We look forward to hosting you on ${date} at ${time} for ${people} people.`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});