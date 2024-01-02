const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const bodyParser = require('body-parser'); // Add this line

const LogInCollection = require("./db");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/signup", async (req, res) => {
    try {
        const result = await LogInCollection.findOne({ name: req.body.name });

        if (!result) {
            // User doesn't exist, create a new one
            const newUser = new LogInCollection({
                name: req.body.name,
                password: req.body.password
            });

            await newUser.save();
            res.status(201).render("login", { naming: req.body.name });
        } else {
            // User already exists
            res.send("User with this name already exists.");
        }
    } catch (error) {
        res.send("Error in signup: " + error.message);
    }
});


app.post("/login", async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.name}` });
        } else {
            res.send("Incorrect username or password.");
        }
    } catch (error) {
        res.send("Error in login: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
