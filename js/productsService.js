function products(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado de productos</h5>'
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/products?page='+page
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
            let listProducts=`
            <button type="button" class="btn btn-success" onclick="createProduct()">Crear</button>
            <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Slug</th>
          <th scope="col">valor</th>
        </tr>
      </thead>
      <tbody>
            `
             console.log('productos',result.info.data)
             result.info.forEach(element =>{
            console.log('products', element)
                listProducts = listProducts + `
                <tr>
                  <td>${element.id}</td>
                  <td>${element.title}</td>
                  <td>${element.slug}</td>
                  <td>${element.price}</td>
                  <td> <button type="button" class="btn btn-outline-info" onclick="getProducts('${element.id}')">Ver</button> </td>
                
                
                </tr>
                
                `
                
            });
            listProducts=listProducts + `
                </tbody>
                </table>
    
                 <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
       
      </ul>
    </nav>
            
            `

        document.getElementById('info').innerHTML=listProducts

    }else{
        document.getElementById('info').innerHTML='no existen productos en la red'
    }
})

    

}
function getProducts(idProducts){
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/products/'+idProducts
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
        const product=response.body
        const modalProduct=`
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="card" ">
                        
                        <div class="card-body">
                            <h5 class="card-title">Informacion del producto: </h5>
                            <p class="card-text">Nombre: ${product.title} </p>
                             <p class="card-text">slug: ${product.slug} </p>
                              <p class="card-text">Valor: ${product.price} </p>
                           
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
        document.getElementById('viewModalProducts').innerHTML=modalProduct
        const modalP = new bootstrap.Modal(document.getElementById('modalProduct'))
        modalP.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro el producto en la Api</h3>'
    }
})




}
function createProduct(){
    const modalProduct=`
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               
                <div class="card" ">
                   
                    <div class="card-body">
                       <form id="formCreateProduct">
                           <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="title_product" placeholder="Titulo del producto" aria-label="Title product" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="price" placeholder=" precio" aria-label=" price" required>
                            </div>
                            </div> 
                             <div class="row mt-3">
                            <div class="col">
                                <input type="text" class="form-control" id="description" placeholder="Description " aria-label="Description" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="categoryId" placeholder="ID de la categoria" aria-label="categoryId" required>
                            </div>
                             <div class="row mt-3">
                              <div class="col">
                            
                                <input type="url" class="form-control" id="image" placeholder="https://ejemplo.com" aria-label="image" required>
                            </div>
                            </div>
                           
                            
                            
                            </div> 
                             <div class="row mt-3">
                            <div class="col">
                                <button type="button" class="btn btn-success" onclick="saveProduct()" >Guardar</button>
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
    document.getElementById('viewModal').innerHTML=modalProduct
    const modalP= new bootstrap.Modal(document.getElementById('modalProduct'))
    modalP.show()

}



function saveProduct(){
    const form= document.getElementById('formCreateProduct')
    if(form.checkValidity()){
        const title_product=document.getElementById('title_product').value
        const price=document.getElementById('price').value
        const description=document.getElementById('description').value
        const categoryId=document.getElementById('categoryId').value
        const image=document.getElementById('image').value
        const product={title_product,price,description,categoryId,image}
        const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/products/'
    fetch(PLATZI_ENDPOINT,{

        method:'POST',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body:JSON.stringify(product)
       
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
            document.getElementById('info').innerHTML='<h3> Se guardo el producto</h3>'


        }else{
            document.getElementById('info').innerHTML='<h3>Error al guardar el producto</h3>'
        }
        const modalId=document.getElementById('modalProduct')
        const modalP=bootstrap.Modal.getInstance(modalId)
        modalP.hide()

    })

    }else{
        form.reportValidity()
    }
    


}
