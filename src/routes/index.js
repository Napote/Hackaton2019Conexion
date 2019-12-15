const { Router } = require("express");
const router = Router();


//Modulo para agregar paciente
const agregarExpediente = require("./add-expediente");
const agregarConsulta = require("./add-consulta");

//Conexión a firebase (Solo la puse por que sí)
const connection = require("./firebase-connection");
const db = connection();

//agregarPaciente(db);
//agregarConsulta(db,"P1000002");
//loggIn(db,{username: "E00001",password: "executioner"});

var centroMedico;
var datosPaciente;
var f = new Date();
var consultas = 0;
var cantExpedientes = 0;

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/loggin",(req,res)=>{
    var bandera = false;
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    db.ref("empleados/"+user.username).once("value", (snapshot)=>{
        if(user.password == snapshot.child("contra").val()){
            transferirDatos(snapshot.val());
            res.render("buscar-paciente");
        }else{
            bandera = true;
            res.render("index", { autenticado: bandera });
        }
        transferirDatos(snapshot.val());
    });
});

function transferirDatos(datos){
    centroMedico = datos.centroMedico;
}

router.post("/registrar-consulta", (req,res) => {
    var id_Paciente = datosPaciente.idPaciente;
    var consulta = {
        centroMedico: centroMedico,
        diagnostico: req.body.diagnostico,
        doctor: req.body.doctor,
        examenes: req.body.examenes,
        fechaConsulta: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
        incapacidad: req.body.incapacidad,
        medicamentosSuministrados: req.body.medicamento 
    }

    db.ref("expedientes/"+id_Paciente+"/consultas").once("value", (snapshot) => {
        consultas++;
    });

    if(agregarConsulta(db,id_Paciente,consulta,consultas))
        res.render("buscar-paciente");
});

router.get("/formulario-consulta", (req,res) => {
    res.render("consulta");
});

router.post("/buscar-expediente", (req,res) => {
    datosPaciente = {
        idPaciente: req.body.idPaciente,
        nombre: req.body.nombre
    };
    db.ref("expedientes/"+datosPaciente.idPaciente).once("value", (snapshot)=>{
        if(datosPaciente.idPaciente == snapshot.key || datosPaciente.nombre == snapshot.val().nombre){
            var paciente = {
                id: datosPaciente.idPaciente,
                nombre: snapshot.child("nombre").val(),
                dui: snapshot.child("dui").val(),
                fechaCreacion: snapshot.child("fechaExpediente").val(),
                fechaNacimiento: snapshot.child("fechaNacimiento").val(),
                telefono: snapshot.child("telefono").val(),
                direccion: snapshot.child("direccion").val(),
                sexo: snapshot.child("sexo").val(),
                ocupacion: snapshot.child("ocupacion").val(),
                tipoSangre: snapshot.child("tipoSangre").val(),
                estadoCivil: snapshot.child("estadoCivil").val(),
                consultas: snapshot.child("consultas").val()
            }
            res.render("expediente-paciente", {datos_paciente: paciente});
        }
    });
});

router.post("/llenar-consulta", (req,res) => {
    db.ref("expedientes/"+datosPaciente.idPaciente).once("value", (snapshot)=>{
        console.log(snapshot.key);
        if(datosPaciente.idPaciente == snapshot.key || datosPaciente.nombre == snapshot.val().nombre){
            var paciente = {
                idPaciente: datosPaciente.idPaciente,
                nombre: snapshot.val().nombre,
                fechaConsulta: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
                centroM: centroMedico
            }
            res.render("consulta", {datos: paciente});
        }
    });
});

router.get("/registrar-expediente", (req,res) => {
    res.render("crear-expediente");
});

router.post("/llenar-expediente", (req,res) => {
    var expediente = {
        nombre: req.body.nombrePaciente,
        direccion: req.body.direccion,
        dui: req.body.dui,
        fechaNacimiento: req.body.fechaNacimiento,
        fechaExpediente: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(),
        tipoSangre: req.body.tipoSangre,
        estadoCivil: req.body.estadoCivil,
        alergias: req.body.alergias,
        emergencias: {
            telefono: req.body.telefonoEmergencia,
            nombre: req.body.nombreEmergencia,
            parentesco: req.body.parentescoEmergencia
        },
        telefono: req.body.telefono,
        sexo: req.body.sexo
    }

    db.ref("expedientes").once("value", (snapshot) => {
        cantExpedientes++;
    });

    if(agregarExpediente(db,expediente,cantExpedientes))
        res.render("buscar-paciente");
});

router.get("/buscar-paciente", (req,res) => {
    res.render("buscar-paciente");
});

module.exports = router;