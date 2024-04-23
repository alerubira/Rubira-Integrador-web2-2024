const conectar=require('./conexxion.js');
const axios = require('axios');
const procesarProductos=require('./procesar.js');
const activarPeticion=require('./peticionJson.js');
activarPeticion.activarPeticion();
 let listaP=[];    
axios.get('https://fakestoreapi.com/products')
  .then(response => {
    console.log('Respuesta exitosa:');
    
    return procesarProductos.procesarProductos(response.data);
  })
  .then(productos=>{

        conectar(productos);
  })
  .catch(error => {
    
    console.error('Error al hacer la solicitud:', error);
  });
  
  
