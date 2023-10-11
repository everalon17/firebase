var conexion=require("./conexion").conexionUsu;
var Usuario=require("../modelos/Usuario");
var fs = require('fs').promises;
var {subirArchivoU} = require("../middleware/middlewares");

async function mostrarUsuarios(){
    var users=[];
    try{
        var usuarios = await conexion.get();;
        usuarios.forEach(usuario => {
            var user=new Usuario(usuario.id, usuario.data());
            if (user.bandera==0) {
                users.push(user.obtenerDatos);
            }
        });    
    }
    catch(err){
        console.log("Error al recuperar usuarios de la BD: "+err);
    }
    return users;
}

async function nuevoUsuario(datos) {
    var user=new Usuario(null,datos)
    //var error=1;
    if (user.bandera==0) {
        try{
            await conexion.doc().set(user.obtenerDatos);
            console.log("Usuario insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar el nuevo usuario: "+err);
        }
    }
    return error; 
}

async function buscarPorID(id){
    var user;
    try{
        var usuario=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if (usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerDatos;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario: "+err);
    }
    return user;
}

async function modificarUsuario(datos){
    var error = 1;
    var usuario = await buscarPorID(datos.id);
    if (usuario != undefined) {
        var fotoRuta = './web/Usuarios/images/' + usuario.foto;
        await fs.unlink(fotoRuta);                
        var user=new Usuario(datos.id,datos)
        error=1;
        if (user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerDatos);
                console.log("Registro actualizado ");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al usuario: "+err);
            }
        }
        return error;
    }
}

async function borrarUsuario(id){
    var error = 1;
    var user = await buscarPorID(id);
    if(user != undefined){
        try{
            var fotoRuta = './web/Usuarios/images/' + user.foto;
            await fs.unlink(fotoRuta);
            await conexion.doc(id).delete();
            console.log("Registro borrado ");
            var error = 0;
        }
        catch(err){
            console.log("Error al borrar usuario: "+err);
        }
        return error;    
    }
}


module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
}