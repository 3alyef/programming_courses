import path from 'path';
import appRootPath from 'app-root-path';
import { engine } from 'express-handlebars';
import express from 'express';

const app = express();

app.engine('handlebars', engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(appRootPath.toString(), 'views'));


app.use(express.static(path.join(appRootPath.toString(), 'public'))) // Inclui o endereçamento da pasta public > css > globals.css

//path.join() garante a concatenação correta

app.get('/', (request, response)=>{
    response.render('home')
})

export { app };