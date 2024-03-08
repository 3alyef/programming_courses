import dotenv from 'dotenv';
import { authenticateDB } from './DB/DB';
import { app } from './app';
import 'app-root-path';

dotenv.config();
authenticateDB();

const PORT = process.env.PORT || 3000;

console.log()


app.listen(PORT, ()=>{
    console.log(`Runnig on PORT:${PORT}`)
})
