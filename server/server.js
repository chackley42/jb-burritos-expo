require('dotenv').config(); // Load environment variables from config.env
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const routes = require('./routes/routes.js');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
// app.use takes 2 things: base endpoint, and contents of routes
// all other endpoints will start with '/api'
app.use('/api', routes)

const uri = process.env.mongoDbAtlasUri;

async function checkDatabaseExistence() {
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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
