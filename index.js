const express =require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port =process.env.PORT || 5000
const app=express()
app.use(cors())
app.use(express.json())
//midle ware
// mizanurrahmanofficial70
// CdkxyasycZgIAwOZ
app.get('/',(req,res)=>{
    res.send('This is mongo DB')
})



const uri = "mongodb+srv://mizanurrahmanofficial70:CdkxyasycZgIAwOZ@cluster0.ln1myom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("UserDB");
    const userCollection = database.collection("User");
    app.get('/user',async(req,res)=>{
      const cursor=userCollection.find()
      const result= await cursor.toArray()
      res.send(result)
    })
    app.get('/user/:id',async(req,res)=>{
      const id =req.params.id
      const filter = {_id: new ObjectId (id)}
      const result =await userCollection.findOne(filter)
      res.send(result)
    })
    app.post('/user',async(req,res)=>{
      const user=req.body
      console.log('user',user)
      const result = await userCollection.insertOne(user);
      res.send(result)
    })
    app.put('/user/:id',async(req,res)=>{
      const id=req.params.id
      const updateUser=req.body
      const query={_id: new ObjectId (id)}
      const options={upsert:true}
     const update={
      $set:{
        name: updateUser.name,
        email: updateUser.email
      }
     }
     const result =await userCollection.updateOne(query,update,options)
     res.send(result)
    })
    app.delete('/user/:id',async(req,res)=>{
      const id=req.params.id
      console.log('delete',id)
      const query={_id: new ObjectId(id)}
      const result =await userCollection.deleteOne(query)
      res.send(result)

    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`Your server is runing${port}`)
})