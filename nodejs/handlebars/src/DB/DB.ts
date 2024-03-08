import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName:string = String(process.env.DB_NAME);
const dbUser:string = String(process.env.DB_USER);
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || "localhost";


const sequelize = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword, 
    {
        host:dbHost,
        dialect:"mysql",
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    }      
);

const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão bem-sucedida!");
    } catch (error) {
        console.error(`Erro na conexão: ${error}`);
    }
};

export { authenticateDB }

