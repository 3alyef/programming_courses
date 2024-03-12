import dotenv from 'dotenv';
import { authenticateDB } from './models/DB';
import { app } from './app';
import 'app-root-path';

import { Post } from './models/Post';

dotenv.config();
authenticateDB();

const PORT = process.env.PORT || 3000;

//Post.sync({force:true})

app.listen(PORT, ()=>{
    console.log(`Runnig on PORT:${PORT}`)
})

