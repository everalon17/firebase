var ruta = require("express").Router();
var {subirArchivoP} = require("../middleware/middlewares");
var { mostrarProductos, nuevoProducto, buscarProdPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");

ruta.get("/api/mostrarProductos", async(req,res)=>{
    var productos = await mostrarProductos();
    if (productos.length>0)
        res.status(200).json(productos);
    else
        res.status(400).json("No hay productos");
});

ruta.post("/api/nuevoProducto",subirArchivoP(), async(req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    if (error == 0)
        res.status(200).json("Producto registrado");
    else
        res.status(400).json("Datos incorrectos");
});
  
ruta.get("/api/buscarProductoPorId/:id", async(req, res) => {
    var product = await buscarProdPorId(req.params.id);
    if (product == "")
        res.status(400).json("No se encontro ese producto");
    else
        res.status(200).json(product);
});
  
ruta.post("/api/editarProducto", async(req, res) => {
    var error = await modificarProducto(req.body);
    if(error == 0)
        res.status(200).json("Producto Actualizado");
    else
        res.status(400).json("Error al actualizar el producto");
});
  
ruta.get("/api/borrarProducto/:id", async(req, res) => {
    var error = await borrarProducto(req.params.id);
    if(error == 0)
        res.status(200).json("Producto borrado");
    else
        res.status(400).json("Error al borrar el producto");
});

module.exports = ruta;
  