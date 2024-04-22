const express = require('express');
const path = require('path');
const pug = require('pug');
const app = express();
const compras= require('./peticionJson');
app.use(express.json());

function conectar(productos) {
    
    app.use(express.static(path.join(__dirname, 'public')));
 

app.post('/compra', (req, res) => {
    let compra = req.body.compra;
     compras.compras(compra);
    res.status(200).send('Compra guardada correctamente.');
});

   
   
    app.get('/', (req, res) => {
        const html = pug.renderFile(path.join(__dirname, 'public', 'vistaP.pug'),{productos:productos});
        
        res.send(html);
    });
    
     app.get('/carrito', (req, res) => {
       
        const html = pug.renderFile(path.join(__dirname, 'public', 'vistaCarrito.pug'));
        
        res.send(html);
    });
    

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Error interno del servidor');
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
    });
}

module.exports = conectar;
