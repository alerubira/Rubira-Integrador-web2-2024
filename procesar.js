const traductor=require('node-google-translate-skidz');
let arregloConOfertas=[];
let productos=[];

function procesarProductos(listaP){
  
    listaP.forEach((element) => {
      let ofertaEncontrada = arregloConOfertas.find(oferta => oferta.id === element.id); 
      let producto={};
      

      producto.precio=element.price;

        if(ofertaEncontrada){
          producto.descuento=ofertaEncontrada.porcentaje;
          producto.dineroDescontado=dineroDescontados(producto.precio,producto.descuento);
          producto.precioFinal=(producto.precio-producto.dineroDescontado).toFixed(2);
        }else{
          producto.precioFinal=producto.precio;
          producto.descuento=0;
        }
          producto.id=element.id;
          producto.imagen=element.image;
          async function traducirProductos(element) {
            const promesas = [
              traducir(element.title),
              traducir(element.category),
              traducir(element.description)
            ];
            const [titulo, categoria, descripcion] = await Promise.all(promesas);
            producto.titulo = titulo;
            producto.categoria = categoria;
            producto.descripcion = descripcion;
          }
          
          traducirProductos(element);
          
          productos.push(producto);
        
        
      
      });
      return productos;
}
function recibir(arreglo){
    arregloConOfertas=arreglo;
    
}
module.exports={procesarProductos,recibir};
function dineroDescontados(precio,descuento){

return (precio*descuento)/100;
}
async function traducir(texto){
  
  let traducido=await  traductor({
      text: texto,
      source: 'en',
      target: 'es'
      })
    return traducido.translation;
  }
  