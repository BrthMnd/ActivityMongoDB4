const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const uri = "mongodb+srv://Brandon:1allahuakbar123@cluster0.nsvkq9w.mongodb.net/?retryWrites=true&w=majority"

router.get('/', async (req, res) => {
  const client = new MongoClient(uri)
  try {
    await client.connect();
    const cliente = await client.db('Rcservice').collection('cliente').find({}).toArray();
    res.status(200).json(cliente)
  } finally {

    await client.close()
  }

})
//findOne()
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const client = new MongoClient(uri)
  console.log(id)
  try {
    await client.connect();
    const cliente = await client.db('Rcservice').collection('cliente').find({ _id: new ObjectId(id) }).toArray();
    res.status(200).json(cliente)
  } finally {

    await client.close()
  }


})
//post
router.post('/', async (req, res) => {
  const body_requerido_Post = req.body
  const client = new MongoClient(uri)
  console.log(body_requerido_Post)
  try {
    await client.connect();
    const result = await client.db('Rcservice').collection('cliente').insertOne(body_requerido_Post);
    res.status(201).json({
      message: 'Insertado Un documento',
      data: body_requerido_Post,
      result
    })
  } finally {

    await client.close()
  }


})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const body_requerido_Patch = req.body
  const client = new MongoClient(uri)
  console.log(body_requerido_Patch)
  try {
    await client.connect();
    const result = await client.db('Rcservice').collection('cliente').updateOne({ _id: new ObjectId(id) }, { $set: { tipo: body_requerido_Patch.tipo, clase: body_requerido_Patch.clase } });
    res.status(200).json({
      message: 'Documento Actualizado',
      data: body_requerido_Patch,
      result
    })
  } finally {

    await client.close()
  }


})
// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  // const body_requerido_Delete = req.body
  const client = new MongoClient(uri)
  try {
    await client.connect();
    const result = await client.db('Rcservice').collection('cliente').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({
      message: 'Documento Eliminado',
      result
    })
  } finally {

    await client.close()
  }


})





module.exports = router;