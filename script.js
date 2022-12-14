let postsDisplay = document.querySelector("#postsDisplay")
let buttonModal = document.querySelectorAll(".btnModal")
let username = document.querySelector("#username")
let email = document.querySelector("#email")
let modalTitle = document.querySelector("#modalTitle")
let postBody = document.querySelector(".modal-body")
let commentsDisplay= document.querySelector("#commentsDisplay")
let commentNum= document.querySelector("#commentNum")
let commentBtn
let postId
let datosPosts
let datosUsers
let datosUser
let datosPost
let datosComments
let datosCommentsPost
let postUserId
let b

function refresh() {
  fetch("http://localhost:3000/posts")
    .then(Response => Response.json())
    .then(data => datosPosts = data)
    .then(cargarPosts)
    .then(assignBtn)
  fetch("http://localhost:3000/users")
    .then(Response => Response.json())
    .then(data => datosUsers = data)
  fetch("http://localhost:3000/comments")
    .then(Response => Response.json())
    .then(data => datosComments = data)
}
refresh()
function cargarPosts() {
  datosPosts.forEach(post => {
    if (post.id < 22) {
      postsDisplay.innerHTML +=
        `<div class="card">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <button type="button" class="btn btn-primary btnModal" id="${post.id}" user="${post.userId}"data-bs-toggle="modal"  data-bs-target="#modal">
                  Open
                </button>
                <h3></h3>
              </div>
            </div>`
    }
  })
}
function assignBtn() {
  buttonModal = document.querySelectorAll(".btnModal")
  buttonModal.forEach(btn => {
    btn.addEventListener("click", showModal)
  })
}
function getUser(i) {
  fetch(`http://localhost:3000/users/${i}`)
    .then(Response => Response.json())
    .then(data => datosUser = data)
    .then(datosUser => username.textContent = datosUser.username)
    .then(data => email.textContent = datosUser.email)
}
function getPost(i) {
  fetch(`http://localhost:3000/posts/${i}`)
    .then(Response => Response.json())
    .then(data => datosPost = data)
    .then(datosPost => postBody.innerHTML = datosPost.body)
    .then(data => modalTitle.innerHTML = datosPost.title)
}
function getComments(i) {
  datosCommentsPost = null
  datosCommentsPost = datosComments.filter(comment => comment.postId == postId)
  commentBtn = document.querySelector("#commentBtn")
  commentBtn.addEventListener("click",showComments)
  
}
function assignBtnComment() {
  commentBtn = document.querySelector("#commentBtn")
  commentBtn.addEventListener("click",showComments)
  b=0
  
}
function showComments(){
  commentsDisplay.innerHTML=" "
  datosCommentsPost.forEach(commentpost=> commentsDisplay.innerHTML +=`<div class="commentBox"><h1 class="commentTitle">${commentpost.name}</h1><br><p class="commentBody">${commentpost.body}</p></div><hr>`)
  if (b==0){
    commentsDisplay.style.opacity="100%"
    b+=1
  }
  else if (b==1){
    commentsDisplay.style.opacity="0%"
    b-=1
  }
}
function showModal(e) {
  b=0
  postUserId = e.path[0].attributes.user.value
  postId = e.path[0].attributes.id.value
  getPost(postId)
  getUser(postUserId)
  getComments(postId)
  showComments()
  assignBtnComment()
  commentsDisplay.style.opacity="0%"
} 
