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

var prueba;

router.post("/loggin",(req,res)=>{
    var bandera = false;
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    const empleados = db.ref().child("empleados");
    console.log("AAAAAAAAAAAA",empleados);
    db.ref("empleados").once("child_added", (snapshot)=>{
        prueba = snapshot.val();
        console.log("Adentro",prueba);
        if(user.username == snapshot.key && user.password == snapshot.val().contra){
            res.render("buscar-paciente");
        }else{
            bandera = true;
            res.render("index",{autenticado: bandera});
        }
    });

    console.log("Afuera",prueba);
});

router.post("/registrar-consulta", (req,res) => {
    var idPaciente = req.body.idPaciente;
    var consulta = {
        centroMedico: req.body.centroMedico,
        diagnostico: req.body.diagnostico,
        doctor: req.body.doctor,
        examenes: req.body.examenes,
        fechaConsulta: req.body.fechaConsulta,
        incapacidad: req.body.incapacidad,
        medicamentosSuministrados: req.body.medicamento 
    }
    if(agregarConsulta(db,idPaciente,consulta))
        res.render("buscar-paciente");
});

router.get("/formulario-consulta", (req,res) => {
    res.render("consulta");
});

router.post("/buscar-paciente", (req,res) => {
    var datos = {
        idPaciente: req.body.idPaciente,
        nombre: req.body.nombre
    };
    console.log("datos",datos);
    db.ref("expedientes").once("value", (snapshot)=>{
        console.log(snapshot.key);
        if(datos.idPaciente == snapshot.key || datos.nombre == snapshot.val().nombre){
            const paciente = snapshot.val();
            res.render("consulta", {datos: paciente});
        }
    });
});
module.exports = router;