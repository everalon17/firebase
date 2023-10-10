var ruta=require("express").Router();
var {subirArchivoU} = require("../middleware/middlewares");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/",async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    console.log(usuarios);
    res.render("usuarios/mostrar",{usuarios})
});

ruta.get("/nuevousuario",async(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario",subirArchivoU(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await nuevoUsuario(req.body);
    res.redirect("/");
});

ruta.get("/editar/:id",async(req,res)=>{
    var user = await buscarPorID(req.params.id);
    //console.log(user);
    res.render("usuarios/modificar",{user});
});

ruta.post("/editar",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    res.redirect("/");
});

ruta.get("/borrar/:id",async(req,res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/"); 
});

module.exports=ruta;