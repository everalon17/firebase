var multer=require("multer");

function subirArchivoU(){
    var storage=multer.diskStorage({
        destination: './web/Usuarios/images',
        filename: (req,file,cb)=>{
            var archivo=file.originalname;
            cb(null,archivo);
        }
    });
    return multer({storage}).single('foto');
}

function subirArchivoP(){
    var storage=multer.diskStorage({
        destination: './web/Productos/images',
        filename: (req,file,cb)=>{
            var archivo=file.originalname;
            cb(null,archivo);
        }
    });
    return multer({storage}).single('foto');
}

module.exports={
    subirArchivoU,
    subirArchivoP
}