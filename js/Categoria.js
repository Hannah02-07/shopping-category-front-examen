function categories(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado De Categorias</h5>'
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/categories?page='+page
    fetch(PLATZI_ENDPOINT,{

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
        let listCategories=`
        <button type="button" class="btn btn-success" onclick="createCategories()">Crear</button>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Slug</th>
      <th scope="col">Imagen</th>
    </tr>
  </thead>
  <tbody>
        `
         console.log('categories',result.info.data)
         result.info.forEach(element =>{
        console.log('categories', element)
            listCategories = listCategories + `
            <tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.slug}</td>
              <td><img src="${element.image}" class="img-thumbnail"alt="avatar del usuario"></td>
              <td> <button type="button" class="btn btn-outline-info" onclick="getCategories('${element.id}')">Ver</button> </td>
            
            
            </tr>
            
            `
            
        });
        listCategories=listCategories + `
            </tbody>
            </table>

             <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
   
  </ul>
</nav>
        
        `

        document.getElementById('info').innerHTML=listCategories

    }else{
        document.getElementById('info').innerHTML='no existen categories en la red'
    }
})

    

}
function getCategories(idCategories){
    const  PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/categories/'+idCategories
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
        const categorie=response.body
        const modalCategories=`
         <div class="modal fade" id="modalCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="card" ">
                        <img src="${categorie.image}" class="card-img-top" alt="Imagen de la categoria">
                        <div class="card-body">
                            <h5 class="card-title">Informacion del usuario: </h5>
                            <p class="card-text">Nombre: ${categorie.name} </p>
                             <p class="card-text">Slug: ${categorie.slug} </p>
                           
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
        document.getElementById('viewModalCategories').innerHTML=modalCategories
        const modalC = new bootstrap.Modal(document.getElementById('modalCategories'))
        modalC.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro la categoria en la Api</h3>'
    }
})




}
function createCategories(){
    const modalCategories=`
    <div class="modal fade" id="modalCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear categoria</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               
                <div class="card" ">
                   
                    <div class="card-body">
                       <form id="formCreateCategories">
                           <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="name" placeholder="Nombre de la categoria" aria-label="Nombre de la categoria" required>
                            </div>
                             <div class="row mt-3">
                              <div class="col">
                            
                                <input type="url" class="form-control" id="image" placeholder="https://ejemplo.com" aria-label="image" required>
                            </div>
                            </div>
                            </div> 
                            
                             <div class="row mt-3">
                            <div class="col">
                                <button type="button" class="btn btn-success" onclick="saveCategories()" >Guardar</button>
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
    document.getElementById('viewModal').innerHTML=modalCategories
    const modalC= new bootstrap.Modal(document.getElementById('modalCategories'))
    modalC.show()

}



function saveCategories(){
    const form= document.getElementById('formCreateCategories')
    if(form.checkValidity()){
        const name=document.getElementById('name').value
        const image=document.getElementById('image').value
        
        const categories={name,image}
        const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/categories/'
    fetch(PLATZI_ENDPOINT,{

        method:'POST',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body:JSON.stringify(categories)
       
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
            document.getElementById('info').innerHTML='<h3> Se guardo la categoria</h3>'


        }else{
            document.getElementById('info').innerHTML='<h3>Error al guardar la categoria</h3>'
        }
        const modalId=document.getElementById('modalCategories')
        const modalC=bootstrap.Modal.getInstance(modalId)
        modalC.hide()

    })

    }else{
        form.reportValidity()
    }
    


}