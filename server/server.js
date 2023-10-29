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
// app.use takes 2 things: base endpoint, and contents of routes
// all other endpoints will start with '/api'
app.use('/api', routes)

//New
// app.listen(8081, () => {
//   console.log("Server is live!!!!!!");
// });

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

// function verifyJWT(req, res, next) {
//   const token = req.headers["x-access-token"]?.split(' ')[1]

//   if (token) {
//     jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
//       if (err) return res.json({
//         isLoggedIn: false,
//         message: "Failed to Authenticate"
//       })
//       req.user = {};
//       req.user.id = decoded.id
//       req.user.username = decoded.username
//       next()
//     })
//   } else {
//     res.json({message: "Incorrect Token Given", isLoggedIn: false})
//   }
// }

checkDatabaseExistence();

// app.post("/register", async (req, res) => {
//   const user = req.body;

//   //check if user already exists or name has been taken by another user already
//   const takenUsername = await User.findOne({username: user.username})
//   const takenEmail = await User.findOne({email: user.email})

//   if (takenUsername || takenEmail) {
//     res.json({message: "Username or email has already been taken"})
//   } else{
//     user.password = await bcrypt.hash(req.body.password, 10)

//     const dbUser = new User({
//       username: user.username.toLowerCase(),
//       email: user.email.toLowerCase(),
//       password: user.password
//     })

//     await dbUser.save()
//     res.json({message: "Success"})
//   }
// })


// app.post("/login", (req, res) => {
//   const userLoggingIn = req.body;

//   User.findOne({ username: userLoggingIn.username })
//   .then((dbUser) => {
//     if (!dbUser) {
//       return res.json({
//         message: "Invalid Username or Password"
//       });
//     }

//     bcrypt.compare(userLoggingIn.password, dbUser.password)
//       .then((isCorrect) => {
//         if (isCorrect) {
//           const payload = {
//             id: dbUser._id,
//             username: dbUser.username,
//           };

//           jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: 86400 },
//             (err, token) => {
//               if (err) return res.json({ message: err });
//               return res.json({
//                 message: "Success",
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res.json({
//             message: "Invalid Username or Password"
//           });
//         }
//       });
//   })
//   .catch((err) => {
//     return res.json({ message: err });
//   });
// });


// app.get("/getUsername", verifyJWT, (req, res) => {
//   res.json({isLoggedIn: true, username: req.user.username})
// })

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
