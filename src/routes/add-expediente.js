function zeroPad(num, largo) {
    return num.toString().padStart(largo, "0");
}

function numeroPaciente(id){
    id += 1;
    return nuevoId = 'P' + zeroPad(id, 7);
}

function addExpediente(database,expediente,cantExpedientes){
    var idPaciente = numeroPaciente(cantExpedientes);
    database.ref("expedientes").child(idPaciente).set(expediente);
    return true;
}



module.exports = addExpediente;