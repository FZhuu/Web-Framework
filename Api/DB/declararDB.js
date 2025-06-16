import mysql from 'mysql2/promise';
import {Sequelize} from 'sequelize'
import senhaDB from './SQLsenha.js';


async function criarDB() {
    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:senhaDB,
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS reactlocaltop');
    await connection.end();
}

let sequelize = new Sequelize('reactlocaltop', 'root', senhaDB, {
    host: 'localhost',
    dialect: 'mysql'
})

async function iniciarDB() {
    await criarDB();
    await sequelize.sync();
}

iniciarDB().then(() => {
    console.log('DB criada com sucesso!');
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:',error)
})

export default sequelize;