import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName:string = String(process.env.DB_NAME);
const dbUser:string = String(process.env.DB_USER);
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(
    dbName , 
    dbUser, 
    dbPassword, 
    {
        host:dbHost,
        dialect:"mysql"
    }
);

sequelize.authenticate().then(()=>{
    console.log("Success!");
}).catch((err)=>{
    console.log(`Error: ${err}`)
});