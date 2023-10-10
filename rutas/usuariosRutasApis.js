var ruta=require("express").Router();
var {subirArchivoU}=require("../middleware/middlewares")
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/api/mostrarUsuarios", async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    if (usuarios.length>0)
        res.status(200).json(usuarios);
    else
        res.status(400).json("No hay usuarios");
});

ruta.post("/api/nuevoUsuario",subirArchivoU(), async(req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoUsuario(req.body);
    if (error == 0)
        res.status(200).json("Usuario registrado");
    else
        res.status(400).json("Datos incorrectos");
});
  
ruta.get("/api/buscarUsuarioPorId/:id", async(req, res) => {
    var user = await buscarPorID(req.params.id);
    if (user == "")
        res.status(400).json("No se encontro ese Usuario");
    else
        res.status(200).json(user);
});
  
ruta.post("/api/editarUsuario",subirArchivoU(), async(req, res) => {
    var error = await modificarUsuario(req.body);
    req.body.foto=req.file.originalname;
    if(error == 0)
        res.status(200).json("Usuario Actualizado");
    else
        res.status(400).json("Error al actualizar el usuario");
});
  
ruta.get("/api/borrarUsuario/:id", async(req, res) => {
    var error = await borrarUsuario(req.params.id);
    if(error == 0)
        res.status(200).json("Usuario borrado");
    else
        res.status(400).json("Error al borrar usuario");
});

module.exports = ruta;
  