const { Router } = require("express");
const router = Router();

//Modulo para agregar paciente
const agregarPaciente = require("./add-patient");
const agregarConsulta = require("./add-consulta");

//Conexión a firebase (Solo la puse por que sí)
const connection = require("./firebase-connection");
const db = connection();

agregarPaciente(db);
agregarConsulta(db,"P1000002");

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/search-patient", (req,res) => {
    console.log(req.body);
    res.redirect("/");
});

router.get("/delete-contact/:id", (req,res) => {
    res.redirect("/");
});

module.exports = router;