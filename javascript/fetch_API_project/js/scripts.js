const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector('#posts-container')

const postPage = document.querySelector('#post')

const postContainer = document.querySelector('#post-container')
const commentsContainer = document.querySelector('#comments-container')

const commentForm = document.querySelector('#comment-form')
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector('#body')
   
// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')
// Get all posts

async function getAllPosts() {
    const response = await fetch(url)
    const data = await response.json()
    loadingElement.classList = 'hide'


    data.map((el)=>{
        const div = document.createElement('div')
    
        

        const h3 = document.createElement('h2')
        h3.textContent = el.title
        const p = document.createElement('p')
        p.textContent = el.body
        const a = document.createElement('a')
        a.innerText = 'Ler'
        a.setAttribute("href", `/post.html?id=${el.id}`)

       
        div.appendChild(h3)
        div.appendChild(p)
        div.appendChild(a)
        postsContainer.appendChild(div)
     
    })
}

async function getPost(id){
    const[responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`), fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()

    loadingElement.classList = 'hide'
    postPage.classList.remove('hide')

    const title = document.createElement('h1')
    title.textContent = dataPost.title

    const body = document.createElement('p')
    body.textContent = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map((e)=>{
        createComment(e)
    })
}


function createComment(comment){

    const div = document.createElement('div')
    const email = document.createElement('h3')
    const commentBody = document.createElement('p')


    email.textContent = comment.email
    commentBody.textContent = comment.body
    div.appendChild(email)
    div.appendChild(commentBody)


    commentsContainer.appendChild(div)

}

// Post a comment

async function postComment(comment){
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-type": "application.json"
        }
    })

    const data = await response.json()
    createComment(data)
}

if(!postId){
    getAllPosts()
} else {
    getPost(postId)

    //Add event to comment form
    commentForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        }

        comment = JSON.stringify(comment)

        postComment(comment)
    })
    
}