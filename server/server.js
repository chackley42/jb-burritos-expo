// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// // get driver connection
// const dbo = require("./db/conn");
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//    });
//   console.log(`Server is running on port: ${port}`);
// });

require('dotenv').config(); // Load environment variables from config.env

const { MongoClient } = require('mongodb');

const uri = process.env.mongoDbAtlasUri;
//.env should contain: mongoDbAtlasUri=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.nfdpspz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp

async function checkDatabaseExistence() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const adminDb = client.db('admin');
    const databasesList = await adminDb.admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => {
      console.log(`- ${db.name}`);
    });
  } catch (err) {
    console.error(err);
}
}

checkDatabaseExistence();
