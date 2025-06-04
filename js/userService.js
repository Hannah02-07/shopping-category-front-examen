function users(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado de usuarios</h5>'
    const PLATZI_ENDPOINT  ='https://api.escuelajs.co/api/v1/users?page='+page
    fetch(PLATZI_ENDPOINT ,{

        method:'GET',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
       
    })

    .then((response)=>{

          return response.json().then(
            data=> {
                return{
                    status:response.status,
                    info: data
                }
            }
          )

    })

    .then((result)=>{
        console.log('resultado',result)
        if(result.status===200){
            let listUsers=`
            <button type="button" class="btn btn-success" onclick="createUser()">Crear</button>
            <table class="table justify-content-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Avatar</th>
           
        </tr>
      </thead>
      <tbody>
            `;
               
            result.info.forEach(element =>{
                listUsers = listUsers + `
                <tr>
                  <td>${element.id}</td>
                  <td>${element.name}</td>
                  <td>${element.email}</td>
                  <td><img src="${element.image}" class="img-thumbnail"alt="avatar del usuario"></td>
                  <td> <button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button> </td>
                
                
                </tr>
                
                `
                
            });
            listUsers=listUsers + `
                </tbody>
                </table>
    
                <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        
       
       
          
      </ul>
    </nav>
            
            `
            
        

        document.getElementById('info').innerHTML=listUsers

    }else{
        document.getElementById('info').innerHTML='no existen usuarios en la red'
    }
})

}
function getUser(idUser){
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/users/'+idUser
    fetch(PLATZI_ENDPOINT,{

        method:'GET',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
       
    })
.then((result)=> {

    return result.json().then(
        data=>{
            return {
                status:result.status,
                body: data
            }
        }
    )
})
.then((response)=>{
    if(response.status===200){
        const user=response.body
        const modalUser=`
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="card" " >
                        <img src="${element.image}" class="card-img-top" alt="Avatar del usuario">
                        <div class="card-body">
                            <h5 class="card-title">Informacion del usuario: </h5>
                            <p class="card-text">Nombre: ${user.name} </p>
                             <p class="card-text">Email: ${user.email} </p>
                           
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
        </div>
        
        
        
        `
        document.getElementById('viewModal').innerHTML=modalUser
        const modal = new bootstrap.Modal(document.getElementById('modalUser'))
        modal.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro el usuario en la Api</h3>'
    }
})
}

function createUser(){
    const modalUser=`
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               
                <div class="card" ">
                   
                    <div class="card-body">
                       <form id="formCreateUser">
                           <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="name" placeholder=" name" aria-label=" name" required>
                            </div>
                            </div> 
                             <div class="row mt-3">
                            <div class="col">
                                <input type="email" class="form-control" id="email" placeholder="Email " aria-label="Email" required>
                            </div>
                            <div class="col">
                                <input type="password" class="form-control" id="password" placeholder="Password" aria-label="Password" required>
                            </div>
                            
                             <div class="row mt-3">
                              <div class="col">
                            
                                <input type="url" class="form-control" id="image" placeholder="https://ejemplo.com" aria-label="image" required>
                            </div>
                            </div>
                            
                            </div>            
                       
                       </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
    </div>
    
    
    
    `
    document.getElementById('viewModal').innerHTML=modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()

}



function saveUser(){
    const form= document.getElementById('formCreateUser')
    if(form.checkValidity()){
        const name=document.getElementById('name').value
        const email=document.getElementById('email').value
        const password=document.getElementById('password').value
        const image=document.getElementById('image').value
        const user={name,email,password,image}
        const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/users/'
    fetch(PLATZI_ENDPOINT,{

        method:'POST',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body:JSON.stringify(user)
       
    })
    .then((result)=> {

        return result.json().then(
            data=>{
                return {
                    status:result.status,
                    body: data
                }
            }
        )
    })
    .then((response)=>{
        if(response.status===201){
            document.getElementById('info').innerHTML='<h3> Se guardo el usuario</h3>'


        }else{
            document.getElementById('info').innerHTML='<h3>Error al guardar el usuario</h3>'
        }
        const modalId=document.getElementById('modalUser')
        const modal=bootstrap.Modal.getInstance(modalId)
        modal.hide()

    })

    }else{
        form.reportValidity()
    }
    


}
