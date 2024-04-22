document.addEventListener('DOMContentLoaded', function() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  console.log(carrito);
  let tbody = document.querySelector('#divPrincipal #divProductos table tbody');

  carrito.forEach(function(producto) {
      let tr = document.createElement('tr');
      tr.classList.add('trProducto');

      let tdCodigo = document.createElement('td');
      tdCodigo.classList.add('tdCodigo');
      tdCodigo.textContent = producto.codigo;

      let tdTitulo = document.createElement('td');
      tdTitulo.classList.add('tdTitulo');
      tdTitulo.textContent = producto.titulo;

      let tdPrecio = document.createElement('td');
      tdPrecio.classList.add('tdPrecio');
      tdPrecio.textContent = producto.precioFinal;

      let tdCantidad = document.createElement('td');
      tdCantidad.classList.add('tdCantidad');
      tdCantidad.textContent = producto.cantidad;

      let tdAgregar = document.createElement('td');
      let btnAgregar = document.createElement('button');
      btnAgregar.textContent = 'agregar';
      btnAgregar.type = 'button';
      btnAgregar.addEventListener('click', function() {
          agregar(tr, true);
      });
      tdAgregar.appendChild(btnAgregar);

      let tdQuitar = document.createElement('td');
      let btnQuitar = document.createElement('button');
      btnQuitar.textContent = 'quitar';
      btnQuitar.type = 'button';
      btnQuitar.addEventListener('click', function() {
          agregar(tr, false);
      });
      tdQuitar.appendChild(btnQuitar);

      let tdPrecioSubTotal = document.createElement('td');
      tdPrecioSubTotal.classList.add('tdPrecioSubTotal');
      tdPrecioSubTotal.textContent = producto.precioSubtotal;

      tr.appendChild(tdCodigo);
      tr.appendChild(tdTitulo);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdCantidad);
      tr.appendChild(tdAgregar);
      tr.appendChild(tdQuitar);
      tr.appendChild(tdPrecioSubTotal);

      tbody.appendChild(tr);
  });
  incrementar();
});

/*function agregar(fila, esAgregar) {
  // Función para agregar o quitar productos del carrito
}*/

function incrementar(){
    let cantidadProductos=document.getElementsByClassName('tdCantidad');
    let cantidadTotalProductos=document.getElementById('tdCantidadTotal');
    let precioSubTotales=document.getElementsByClassName('tdPrecioSubTotal');
    let precioTotal=document.getElementById('tdPrecioTotal');

    let total=0;
    for(cant of cantidadProductos){
          total +=parseInt(cant.textContent);
    }
    cantidadTotalProductos.textContent=total;
    total=0;
    for(cant of precioSubTotales){
      total+=parseFloat(cant.textContent);
    }
    precioTotal.textContent=total.toFixed(2);
  }
  function agregar(trProducto,sumar){
       let cantidad = parseInt(trProducto.querySelector('.tdCantidad').innerText);
       cantidad=sumar?cantidad +1 : cantidad -1;
       let precio= parseFloat(trProducto.querySelector('.tdPrecio').innerText);
       let precioSubtotall=(precio*cantidad).toFixed(2);
       trProducto.querySelector('.tdCantidad').textContent=cantidad;
       trProducto.querySelector('.tdPrecioSubTotal').textContent=precioSubtotall;
       incrementar();
  }
  
  function comprar(){
    let compra={};
    let productosCompra=[];
    let producto={};
    let cantidadTotalProductos=document.getElementById('tdCantidadTotal');
    let precioTotal=document.getElementById('tdPrecioTotal');
    compra.numeroCompra="";
    compra.cantidadTotalProductos=parseInt(cantidadTotalProductos.innerText);
    compra.precioTotal=parseFloat(precioTotal.innerText);
    let trProducto=document.getElementsByClassName('trProducto');
    for(prod of trProducto){
        producto.cantidad=parseInt(prod.querySelector('.tdCantidad').innerText);
        if(producto.cantidad>0){
          producto.codigo=prod.querySelector('.tdCodigo').innerText;
          producto.titulo=prod.querySelector('.tdTitulo').innerText;
          producto.precio=prod.querySelector('.tdPrecio').innerText;
          producto.precioST=prod.querySelector('.tdPrecioSubTotal').innerText;
          productosCompra.push(producto);
          producto={};
        }
        }
    compra.productosComprados=productosCompra;
    console.log(compra);
    if(compra.productosComprados.length!==0){ 
    enviarCompra(compra);
    }else{
         alert('Su compra no tiene productos');
  }
  }
  function enviarCompra(compra) {
    fetch('/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ compra: compra })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error al acceder a la Compra:', response.status);
        }else{
          alert("Su compra fue realizada con exito");
          compra=[];
          window.location.href = '/'; 
        }
    })
    
    
  
    .catch(error => {
        console.error('Error de red:', error);
    });
}
