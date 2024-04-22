const fs = require('fs');
const arreglo=require('./procesar');
let arregloConOfertas;
function activarPeticion(){
  fs.readFile('public/ofertas.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo con las ofertas:', err);
      return;
    }
     arregloConOfertas = JSON.parse(data);
     
     arreglo.recibir(arregloConOfertas);
     
  });
}
function compras(compra){
 let contenidoExistente = '';
 if (fs.existsSync('./compras.json')) {
     contenidoExistente = fs.readFileSync('./compras.json', 'utf8');
 }

 let arrayJSON = [];
 if (contenidoExistente.trim() !== '') {
     try {
         arrayJSON = JSON.parse(contenidoExistente);
     } catch (error) {
         console.error('Error al analizar el contenido existente:', error);
         res.status(500).send('Error interno del servidor');
         return;
     }
 }
 let numeroCompra = 1;
 if (arrayJSON.length > 0) {
     const ultimoCompra = arrayJSON[arrayJSON.length - 1];
     numeroCompra = ultimoCompra.numeroCompra + 1;
 }
 compra.numeroCompra = numeroCompra;

 arrayJSON.push(compra);

 let nuevoContenido = JSON.stringify(arrayJSON,null,2);

 fs.writeFileSync('./compras.json', nuevoContenido, 'utf8', (err) => {
     if (err) {
         console.error('Error al guardar en compras.json:', err);
         res.status(500).send('Error interno del servidor');
         return;
     }
     console.log('Datos de compra guardados correctamente en compras.json');
 });
}


  module.exports = {activarPeticion,arregloConOfertas,compras};




