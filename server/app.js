import express from "express";
import { crearCliente, getMarketListCliente, getClienteById, getAllClientes, crearAdministrador, getAllAdministradores } from "./database.js";
import cors from 'cors';
import bcrypt from 'bcrypt';


const corsOption = {
    origin: "http://localhost:3000", //especifica origen permitido
    methods: ["GET", "POST"], //especifica los metodos permitidos
    credentials: true, //permite enviar las credenciales (cookies, autenticacion)
}
const app = express();
app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false}))

app.get("/usuarios/:id", async(req,res) =>{
    const user = await getClienteById(req.params.id);
    res.status(200).send(user);
})

app.get("/usuarios", async (req, res) => {
    try {
      const users = await getAllClientes();
      res.status(200).json(users); // Cambiado send por json para enviar los datos en formato JSON
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
    }
  });

app.post("/registrarseCliente", async(req,res) => {
    const {nombre, usuario, contraseña} = req.user;
    const user = await crearCliente(nombre, usuario, contraseña);
    res.status(201).send(user);
});

//administradores

app.post("/registrarseAdmin", async(req,res) => {
  
  try {
    //bcrypt srive para encriptar los datos de los usuarios
    //const hashPassword = bcrypt(req.body.contraseña, 10);
    const data = {
      nombre: req.body.nombre, 
      usuario: req.body.usuario, 
      contraseña: req.body.contraseña
    };
    const user = await crearAdministrador(data);
    res.status(201).send(user);
    res.redirect("/");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
  
});

app.post("/registrarseAdmin", async(req,res) => {
  req.body.nombre_completo;
});

app.post("/registrarseAdmin", async(req,res) => {
  req.body.nombre_completo;
});

app.get("/administradores", async (req, res) => {
    const users = await getAllAdministradores();
    res.status(200).json(users); // Cambiado send por json para enviar los datos en formato JSON
    console.log(users);
});


app.listen(8080, () => {
    console.log("Server running on port 8080");
});