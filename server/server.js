require('dotenv').config(); // Load environment variables from config.env
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('./models/users.ts')
const mongoose = require("mongoose");
const cors = require('cors');
const { MongoClient } = require('mongodb');
const routes = require('./routes/routes')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser);

const dbURI = process.env.mongoDbAtlasUri;

app.use(cors());
app.use(express.json());
app.use('/api', routes)

const uri = process.env.mongoDbAtlasUri;

async function checkDatabaseExistence() {

  mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
.then((res) => {
  app.listen(port, () => console.log("Mongoose connected!"))
  
})
.catch(err => console.log(err))
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const adminDb = client.db('admin');
    const databasesList = await adminDb.admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach((db) => {
      console.log(`- ${db.name}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close(); // Close the MongoDB connection after checking database existence
  }
}

checkDatabaseExistence();
