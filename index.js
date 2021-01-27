const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;
const fs= require('fs');
const fileUpload = require('express-fileupload');

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
require('dotenv').config();


const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
  const informationCollection = client.db("doctormongo").collection("appointments");
  // perform actions on the collection object
  console.log("hello i am connect");

  app.post('/addappointment', (req,res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const gender = req.body.gender;
    const age = req.body.age;
    const weight = req.body.weight;
    const time = req.body.time;
    const date = req.body.date;
    console.log(name);
    informationCollection.insertOne({name, phone, email, gender, age, weight, time, date})
    .then(result =>{
        res.send(result.insertedCount>0)
    })

  })

  app.post('/singlecountry',(req,res) => {
    const date = req.body.date;
    console.log(date);
    informationCollection.find({date})
    .toArray((err , documents)=>{
      res.send(documents)
    })
  })

});

app.listen(process.env.PORT || port)