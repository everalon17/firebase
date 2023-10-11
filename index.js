var express=require("express");
var path=require("path");
var cors=require("cors");
var session =require("express-session");
var rutasUsu=require("./rutas/usuariosRutas");
var rutasProd=require("./rutas/productosRutas");
var rutasUsuApi = require("./rutas/usuariosRutasApis");
var rutasProdApi = require("./rutas/productosRutasApis");
require("dotenv").config();

var app=express();
app.set("view engine","ejs");
app.use(cors());
//app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRETO,
    resave:true,
    saveUninitialized:true
}));

app.use("/", express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsu);
app.use("/", rutasUsuApi);
app.use("/producto",rutasProd);
app.use("/", rutasProdApi);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("servidor en http://localhost:"+port);
});

