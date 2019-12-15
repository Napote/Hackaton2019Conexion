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

var infoObtenida;


router.post("/loggin",(req,res)=>{
    var bandera = false;
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    db.ref("empleados/"+user.username).once("value", (snapshot)=>{
        if(user.password == snapshot.child("contra").val()){
            res.render("buscar-paciente");
        }else{
            bandera = true;
            res.render("index",{autenticado: bandera});
        }
        transferirDatos(snapshot.val());
    });
});

function transferirDatos(datos){
    console.log("Datos transferidos",datos);
    infoObtenida = datos;
    console.log("Variable afuera", infoObtenida);
}

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
    db.ref("expedientes/"+datos.idPaciente).once("value", (snapshot)=>{
        console.log(snapshot.key);
        if(datos.idPaciente == snapshot.key || datos.nombre == snapshot.val().nombre){
            infoPaciente(snapshot.val());
            res.render("consulta", {datos: snapshot.val(), usario: datos});
        }

    });
});

function infoPaciente(datos){
    console.log("Informacion del paciente",datos);
}

module.exports = router;