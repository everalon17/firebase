var ruta = require("express").Router();
var {subirArchivoP} = require("../middleware/middlewares");
var { mostrarProductos, nuevoProducto, buscarProdPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");

ruta.get("/", async(req,res)=>{
    var productos = await mostrarProductos();
    console.log(productos);
    res.render("productos/mostrarP", {productos});
});

ruta.get("/nuevoproducto", async(req, res) => {
    res.render("productos/nuevoP");
});

ruta.post("/nuevoproducto",subirArchivoP(), async(req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/producto");
});
  
ruta.get("/editar/:id", async(req, res) => {
    var product = await buscarProdPorId(req.params.id);
    res.render("productos/modificarP", {product});
});
  
ruta.post("/editar",subirArchivoP(), async(req, res) => {
    req.body.foto=req.file.originalname;
    var error = await modificarProducto(req.body);
    res.redirect("/producto");
});
  
ruta.get("/borrar/:id", async(req, res) => {
    await borrarProducto(req.params.id);
    res.redirect("/producto");
});

module.exports = ruta;
  