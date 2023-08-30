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

export async function getMarketListCliente(usuario, contraseña){
    const row = await pool.query(
        'SELECT * FROM clientes WHERE nombre_usuario = ? AND contraseña= ?',
        [usuario,contraseña]
    )
    return row;
}

export async function crearCliente(nombre_completo, nombre_usuario, contraseña){
    const [user] = await pool.query(
        'INSERT INTO clientes (nombre_completo, nombre_usuario, contraseña) VALUES (?,?,?)',
        [nombre_completo,nombre_usuario,contraseña]   
    )
    return user;
}

export async function getClienteById(id){
    const [row] = await pool.query(
        'SELECT * FROM clientes WHERE id = ?',
        [id]
    )
    return row;
}

export async function getAllClientes() {
    const [rows] = await pool.query('SELECT * FROM clientes');
    return rows;
}

export async function iniciarSesion(nombre_usuario, contraseña) {
    const [row] = await pool.query(
      'SELECT * FROM clientes WHERE nombre_usuario = ? AND contraseña = ?',
      [nombre_usuario, contraseña]
    );
    return row.length > 0 ? row[0] : null;
  }
export async function obtenerNombreCompletoDelUsuario(nombre_usuario, contraseña) {
  const nombre_comleto = await pool.query(
    'SELECT nombre_completo FROM clientes WHERE nombre_usuario = ? AND contraseña = ?',
    [nombre_usuario, contraseña]
  );
  return nombre_comleto;
}    

export async function verificarUsuario(nombre_usuario) {
  const [row] = await pool.query(
    'SELECT * FROM clientes WHERE nombre_usuario = ?',
    [nombre_usuario]
  );
  return row[0]; // Retorna el usuario si existe, o undefined si no existe
}

//ADMINISTRADORES

export async function verificarAdministradores(nombre_usuario) {
  const [row] = await pool.query(
    'SELECT * FROM administradores WHERE nombre_usuario = ?',
    [nombre_usuario]
  );
  return row[0]; // Retorna el usuario si existe, o undefined si no existe
}

export async function getAllAdministradores() {
  const [rows] = await pool.query('SELECT * FROM administradores');
  return rows;
}

export async function crearAdministrador(nombre_completo, nombre_usuario, contraseña) {
  const [user] = await pool.query(
    'INSERT INTO administradores (nombre_completo, nombre_usuario, contraseña) VALUES (?, ?, ?)',
    [nombre_completo, nombre_usuario, contraseña]
  );
  return user;
}

export async function obtenerNombreCompletoDelUsuarioAdmin(nombre_usuario, contraseña) {
  const nombre_comleto = await pool.query(
    'SELECT nombre_completo FROM administradores WHERE nombre_usuario = ? AND contraseña = ?',
    [nombre_usuario, contraseña]
  );
  return nombre_comleto;
} 

export async function iniciarSesionAdmin(nombre_usuario, contraseña) {
  const [row] = await pool.query(
    'SELECT * FROM administradores WHERE nombre_usuario = ? AND contraseña = ?',
    [nombre_usuario, contraseña]
  );
  return row.length > 0 ? row[0] : null;
}