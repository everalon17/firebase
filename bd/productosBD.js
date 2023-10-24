var conexion=require("./conexion").conexionProd;
var Producto=require("../modelos/Producto");
var fs = require('fs').promises;


async function mostrarProductos(){
    var products=[];
    try{        
        var productos = await conexion.get();
        productos.forEach(producto=> {
            var product = new Producto(producto.id, producto.data())
            if(product.bandera == 0){
                products.push(product.obtenerDatosProd);
            } 
        });
    }
    catch(err){
        console.log("Error al recuperar productos de la BD: "+err);
    }
    return products;
}

async function nuevoProducto(datos){
    var product = new Producto(null,datos);
    //var error = 1;
    if(product.bandera == 0){
        try{
            await conexion.doc().set(product.obtenerDatosProd);
            console.log("Producto insertado a la BD");
            error = 0;
        }
        catch{
            console.log("Error al capturar el nuevo producto: "+err);
        }
    }
    return error;
}

async function buscarProdPorId(id){
    var product;
    try{
        var  producto = await conexion.doc(id).get();
        var productoObejeto = new Producto( producto.id, producto.data());
        if (productoObejeto.bandera==0){
            product=productoObejeto.obtenerDatosProd;
        }
    }
    catch(err){
        console.log("Error al recuperar producto: "+err);
    }
    return product;
}

async function modificarProducto(datos){
    var error = 1;
    var producto = await buscarProdPorId(datos.id);
    if (datos.foto==producto.foto) {
        datos.foto = datos.fotoVieja;
    } else {
        var fotoRuta = './web/Productos/images/' + producto.foto;
        await fs.unlink(fotoRuta);
    }
    if(producto != undefined){
        var product = new Producto(datos.id,datos);
        var error = 1;
        if (product.bandera == 0){
            try{
                await conexion.doc(product.id).set(product.obtenerDatosProd);
                console.log("Registro actualizado");
                error=0;
            }
            catch(err){
                console.log("Error al modificar producto: "+err);
            }    
        }
        return error;
    }
}

async function borrarProducto(id){
    var error = 1;
    var product = await buscarProdPorId(id);
    if (product != undefined) {
        try{
            var fotoRuta = './web/Productos/images/' + product.foto;
            await fs.unlink(fotoRuta);
            await conexion.doc(id).delete();
            console.log("Registro borrado");
            error = 0;
        }
        catch(err){
            console.log("Error al borrar producto: "+err);
        }
        return error;     
    }
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarProdPorId,
    modificarProducto,
    borrarProducto
}