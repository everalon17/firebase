var ruta=require("express").Router();
var {subirArchivoU} = require("../middleware/middlewares");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario, login}=require("../bd/usuariosBD");
var {autorizado,admin} = require("../middleware/funcionesPassword");

ruta.get("/",async(req,res)=>{
    res.render("usuarios/login");
});

ruta.post("/login",async(req,res)=>{
    var user = await login(req.body);
    if (user == undefined) {
        res.redirect("/");
    }
    else{
        if(user.admin){
            req.session.admin=req.body.usuario;
            res.redirect("/producto");    
        } else {
            req.session.usuario=req.body.usuario;
            res.redirect("/mostrarUsuarios");    
        }
    }
});

ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/");
});

ruta.get("/mostrarUsuarios",autorizado,async(req,res)=>{
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar",{usuarios});
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

ruta.post("/editar",subirArchivoU(),async(req,res)=>{
    if (req.file!=undefined) {
        req.body.foto=req.file.originalname;        
    } else {
        req.body.foto = req.body.fotoVieja;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/mostrarUsuarios");
});

ruta.get("/borrar/:id",async(req,res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/mostrarUsuarios"); 
});

module.exports=ruta;