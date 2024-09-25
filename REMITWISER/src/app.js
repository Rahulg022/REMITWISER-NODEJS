// src/app.js
require('dotenv').config()
const express = require("express");
const path = require("path");
require("./db/conn");  // Import connection
const RemitUser = require("./models/registers");  // Import schema

const RemitterInfoModel = require("./models/remitterInfo"); // Adjust the path if necessary

const BeneficiaryInfoModel = require("./models/beneficiaryInfo"); 

const bcrypt=require("bcryptjs")

const app = express();
const hbs = require("hbs");

const port = process.env.PORT || 8000;

// Paths for static and views directories
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views"); // Ensure this is correct
app.set("views", templates_path);

const partials_path = path.join(__dirname, "../templates/partials");

// Middleware
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up hbs view engine
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Register route
app.post("/register", async (req, res) => {
    try {
        const registerUser = new RemitUser({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            pannumber: req.body.pannumber,
            phonenumber: req.body.phonenumber,
            purpose: req.body.purpose,
            dob: req.body.dob,
            address: req.body.address,
            postalcode: req.body.postalcode,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country
            
        });


//console.log("the success part"+registerUser)
const token = await registerUser.generateAuthToken();

//console.log("the token part"+token);

 const registered= await registerUser.save();
//console.log("the page part"+registered);

        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await RemitUser.findOne({ email });

        const isMatch = await bcrypt.compare(password,user && user.password)

        const token = await user.generateAuthToken();

        if (isMatch ) {
            res.status(201).render("dashboard");
        } else {
            res.send("Invalid login credentials");
        }
    } catch (error) {
        res.status(400).send("Invalid login");
    }
});

app.get("/remitterInfo", (req, res) => {
    res.render("remitterInfo");
});



app.get("/remitterInfo", async (req, res) => {
    const userEmail = req.session.userEmail; // Fetch user email from session or wherever it is stored
    const user = await Register.findOne({ email: userEmail }); // Query the database

    if (user) {
        res.render("remitterInfo", { user }); // Pass user data to the template
    } else {
        res.redirect("/login"); // Redirect if user is not found
    }
});


app.get("/remitterInfo", async (req, res) => {
    const userEmail = req.session.userEmail; // Assuming you are using sessions
    const user = await Register.findOne({ email: userEmail });
    
    res.render("remitterInfo", { user }); // Pass the user data to the template
});

// Other imports and configurations

// Handle the remitter's personal information
app.post("/remitterInfo", async (req, res) => {
    try {
        const remitterInfo = new RemitterInfoModel({
            // Collecting remitter info from request
            fullname: req.body.fullname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            pannumber: req.body.pannumber,
            purpose: req.body.purpose,
            dob: req.body.dob,
            address: req.body.address,
            postalcode: req.body.postalcode,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
            bankname: req.body.bankname,
            accountnumber: req.body.accountnumber,
            ifsc: req.body.ifsc
        });

        // Save the remitter's info to the database
        await remitterInfo.save();

        // Redirect to the beneficiary info page after successful save
        res.status(201).redirect("/beneficiaryInfo");
    } catch (error) {
        console.error("Error saving remitter info: ", error);
        res.status(400).send("Error saving remitter info");
    }
});


app.get("/beneficiaryInfo", (req, res) => {
    res.render("beneficiaryInfo");
});
// Handle Beneficiary Info submission
app.post("/beneficiaryInfo", async (req, res) => {
    try {
        const beneficiaryInfo = new BeneficiaryInfoModel({
            accountHolderName: req.body.accountHolderName,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode,
            bankName: req.body.bankName,
            bankAddress: req.body.bankAddress,
            bankCountry: req.body.bankCountry,
            swiftCode: req.body.swiftCode
        });

        // Save beneficiary info to the database
        await beneficiaryInfo.save();

        // Redirect or render a success page
        res.status(201).render("sendMoney");  // or a success page
    } catch (error) {
        console.error("Error saving beneficiary info: ", error);
        res.status(400).send("Error saving beneficiary info");
    }
});



// Import the Transactions model
const Transaction = require("./models/transactions");

app.post("/sendMoney", async (req, res) => {
    try {
        const transaction = new Transaction({
            currency: req.body.currency,
            beneficiaryAmount: req.body.beneficiaryAmount,
            amountToPay: req.body.amountToPay,
            relationship: req.body.relationship,
            paymentMethod: req.body.paymentMethod,
            remarks: req.body.remarks
        });

        await transaction.save();

        // Redirect to a success page or back to index
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send("Error processing transaction");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
