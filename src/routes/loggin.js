
function loggIn(database, user){
    database.ref("empleados").on("child_added", (snapshot)=>{
        /*console.log("Llave:",snapshot.key);
        console.log("Valor:",snapshot.val());*/
        if(user.username == snapshot.key && user.password == snapshot.val().contra){
            return true;
        }else{
            return false;
        }
    });
}

module.exports = loggIn;