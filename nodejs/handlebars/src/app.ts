import path from 'path';
import appRootPath from 'app-root-path';
import { engine } from 'express-handlebars';
import express, { request, response } from 'express';
import { Post } from './models/Post';

const app = express();

app.engine('handlebars', engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(appRootPath.toString(), 'views'));


app.use(express.static(path.join(appRootPath.toString(), 'public'))) // Inclui o endereçamento da pasta public > css > globals.css

//path.join() garante a concatenação correta

app.use(express.urlencoded({extended:false})); // to able "bodyparser"
app.use(express.json()); // transform the content from form in json

app.get('/', (request, response)=>{
    response.render('home')
})

app.get('/newpost', (request, response)=>{
    response.render('post')
})

app.get('/posts', (request, response)=>{
    Post.findAll().then((posts)=>{
        response.render('posts', {posts:posts})
    })
    
})

app.post('/addpost', async (request, response)=>{
    try{
        await Post.create ({
            title: request.body.title,
            content: request.body.content
        })
        
        response.redirect('/posts')
    } catch(error){
        console.log(`Erro ao atualizar a base de dados: ${error}`)
    }
})

export { app };