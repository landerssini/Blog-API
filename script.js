let postsDisplay = document.querySelector("#postsDisplay")
let buttonModal = document.querySelectorAll(".btnModal")
let postId
var respuesta
var datos
const cargarPosts = async () => {
  respuesta = await fetch("db.json")
  console.log(respuesta)
  datos = await respuesta.json()
  console.log(datos);
  datos.posts.forEach(post => {
    if (post.id < 22) {
      postsDisplay.innerHTML +=
        `<div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <button type="button" class="btn btn-primary btnModal" onclick="showModal()" data-bs-toggle="modal"  data-bs-target="#modal${post.id}">
              Open
            </button>
          </div>
        </div>
        <div class="modal fade" id="modal${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${post.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      ${post.body}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <div class="dropdown">
        <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item list-group-item-action list-group-item-warning" id="editpost${post.id}" href="#">Edit post</a></li>
          <li><a class="dropdown-item list-group-item-action list-group-item-danger" id="deletepost${post.id}" href="#">Delete post</a></li>
        </ul>
      </div>
</div>
      </div>
    </div>
  </div>
</div>`
    }
  });
}
cargarPosts()
