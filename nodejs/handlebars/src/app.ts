import path from 'path';
import appRootPath from 'app-root-path';
import { engine } from 'express-handlebars';
import express from 'express';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(appRootPath.toString(), 'views'));

//path.join() garante a concatenação correta

app.get('/', (request, response)=>{
    response.render('home')
})

export { app };