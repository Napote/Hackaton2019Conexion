const { Router } = require("express");
const router = Router();


//Modulo para agregar paciente
const agregarPaciente = require("./add-patient");
const agregarConsulta = require("./add-consulta");

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
    var bandera = false;
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    db.ref("empleados").once("child_added", (snapshot)=>{
        if(user.username == snapshot.key && user.password == snapshot.val().contra){
            res.redirect("/regpaciente");
        }else{
            bandera = true;
            res.render("index",{autenticado: bandera});
        }
    });
});

router.post("/search-patient", (req,res) => {
    console.log(req.body);
    res.redirect("/");
});

router.get("/delete-contact/:id", (req,res) => {
    res.redirect("/");
});

module.exports = router;