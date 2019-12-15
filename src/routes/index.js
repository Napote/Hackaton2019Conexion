const { Router } = require("express");
const router = Router();


//Modulo para agregar paciente
const agregarPaciente = require("./add-patient");
const agregarConsulta = require("./add-consulta");
const loggIn = require("./loggin");

//Conexión a firebase (Solo la puse por que sí)
const connection = require("./firebase-connection");
const db = connection();

//agregarPaciente(db);
//agregarConsulta(db,"P1000002");
//loggIn(db,{username: "E00001",password: "executioner"});

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/loggin",(req,res)=>{
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log("Wohoooo funciona",user);
    if(loggIn(db,user)){
        res.redirect("/regpaciente");
    }else{
        
    }
});

router.post("/search-patient", (req,res) => {
    console.log(req.body);
    res.redirect("/");
});

router.get("/delete-contact/:id", (req,res) => {
    res.redirect("/");
});

module.exports = router;