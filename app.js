const express = require('express')
const bodyparse = require('body-parser')

const port = 3999 // Jugamos diablo -_-  
const app = express()

//! configuracion
app.use(express.json()); // funciona para req.body y otras cosas

app.get('/', (req, res) => {
   res.send("melo")

})
//get
//find()
app.use('/servicio', require('./src/router/Servicio'));
app.use('/proveedor', require('./src/router/Proveedores_servicio'));
app.use('/cliente', require('./src/router/Cliente'));

app.listen(port, () => {
   console.log(`escuchando por el localhost:${port}`)
})
