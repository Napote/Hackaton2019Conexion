const { Router } = require("express");
const router = Router();

//Modulo para agregar paciente
const agregarPaciente = require("./add-patient");

//Conexión a firebase
/*const admin = require("firebase-admin");

var serviceAccount = require("../../proyecto-hackathon-2019-firebase-adminsdk-3hdo6-4c1b005ced.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyecto-hackathon-2019.firebaseio.com/"
});

const db = admin.database();*/
//Fin de Conexión a firebase

agregarPaciente();

router.get("/", (req, res) => {
    res.render("regpaciente");
});

router.post("/search-patient", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

router.get("/delete-contact/:id", (req, res) => {
    res.redirect("/");
});

module.exports = router;