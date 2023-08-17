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

export async function crearCliente(nombre, usuario, contraseña){
    const [user] = await pool.query(
        'INSERT INTO clientes (nombre_completo, nombre_usuario, contraseña) VALUES (?,?,?)',
        [nombre,usuario,contraseña]   
    )
    return [user];
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

//ADMINISTRADORES

export async function crearAdministrador(nombre, usuario, contraseña){
    const user = await pool.query(
        'INSERT INTO administradores VALUES (?,?,?)',
        [nombre,usuario,contraseña]   
    );
    return user;
}


export async function getAllAdministradores() {
    const [rows] = await pool.query('SELECT * FROM administradores');
    return rows;
}

