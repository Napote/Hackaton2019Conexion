const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");

var serviceAccount = require("../../losdomoshackaton-firebase-adminsdk-vxtnr-9b6051ddc5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://losdomoshackaton.firebaseio.com/"
});

const db = admin.database

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/new-contact", (req,res) => {
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    res.redirect("/");
});

router.get("/delete-contact/:id", (req,res) => {
    res.redirect("/");
});

module.exports = router;