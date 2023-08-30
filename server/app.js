import express from "express";
import execute from 'mysql2/promise';
import { obtenerNombreCompletoDelUsuarioAdmin, iniciarSesionAdmin, verificarAdministradores, verificarUsuario, obtenerNombreCompletoDelUsuario, getAllAdministradores, crearAdministrador, getAllClientes, crearCliente, iniciarSesion } from "./database.js";
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

const corsOption = {
    //origin: "http://localhost:8081", //especifica origen permitido en REACT NATIVE
    origin: "http://localhost:3000", //especifica origen permitido en NEXT JS
    methods: ["GET", "POST"], //especifica los metodos permitidos
    credentials: true, //permite enviar las credenciales (cookies, autenticacion)
}
const app = express();
app.use(express.json());
app.use(cors(corsOption));


//app.use(bodyParser.urlencoded({extended: true}));

/*
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


*/

//CLIENTES

app.get("/", async (req, res) => {
  try {
    const users = await getAllClientes();
    res.status(200).json(users); // Cambiado send por json para enviar los datos en formato JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});
app.post("/registrarseCliente", async (req, res) => {
  const nombre_completo = req.body.nombre_completo;
  const nombre_usuario = req.body.nombre_usuario;
  const contraseña = req.body.contraseña;
  try {
    const user = await crearCliente(nombre_completo, nombre_usuario, contraseña);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.post("/iniciarSesion", async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const user = await iniciarSesion(nombre_usuario, contraseña);

    if (user) {
      const nombreCompletoDelUsuario = obtenerNombreCompletoDelUsuario(nombre_usuario);
      console.log(nombre_usuario);
      res.status(200).json({ nombre_completo: nombreCompletoDelUsuario });
      //res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.post("/verificarUsuario", async (req, res) => {
  const { nombre_usuario } = req.body;
  try {
    const user = await verificarUsuario(nombre_usuario);
    if (user) {
      res.status(200).json({ exists: true }); // Si el usuario existe
    } else {
      res.status(200).json({ exists: false }); // Si el usuario no existe
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

//ADMINISTRADORES

app.post("/verificarAdministradores", async (req, res) => {
  const { nombre_usuario } = req.body;
  try {
    const user = await verificarAdministradores(nombre_usuario);
    if (user) {
      res.status(200).json({ exists: true }); // Si el usuario existe
    } else {
      res.status(200).json({ exists: false }); // Si el usuario no existe
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.get("/administradores", async (req, res) => {
  try {
    const users = await getAllAdministradores();
    res.status(200).json(users); // Cambiado send por json para enviar los datos en formato JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.post("/registrarseAdmin", async (req, res) => {
  const nombre_completo = req.body.nombre_completo;
  const nombre_usuario = req.body.nombre_usuario;
  const contraseña = req.body.contraseña;
  
  try {
    const user = await crearAdministrador(nombre_completo, nombre_usuario, contraseña);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.post("/iniciarSesionAdmin", async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const user = await iniciarSesionAdmin(nombre_usuario, contraseña);

    if (user) {
      const nombreCompletoDelUsuario = obtenerNombreCompletoDelUsuarioAdmin(nombre_usuario);
      console.log(nombre_usuario);
      res.status(200).json({ nombre_completo: nombreCompletoDelUsuario });
      //res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});