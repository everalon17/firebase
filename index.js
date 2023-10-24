var express=require("express");
var path=require("path");
var cors=require("cors");
//var session =require("express-session"); se almacena en el servidor
var session = require("cookie-session");
var rutasUsu=require("./rutas/usuariosRutas");
var rutasProd=require("./rutas/productosRutas");
var rutasUsuApi = require("./rutas/usuariosRutasApis");
var rutasProdApi = require("./rutas/productosRutasApis");
require("dotenv").config();

var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'session',
    keys:['r9203jfj'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use("/", express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsu);
app.use("/", rutasUsuApi);
app.use("/",rutasProd);
app.use("/", rutasProdApi);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("servidor en http://localhost:"+port);
});

