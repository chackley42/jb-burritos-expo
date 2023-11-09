const express = require('express');
const { MongoClient, ObjectId, Decimal128 } = require('mongodb'); // Import ObjectId from mongodb
//New Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.ts")
const Order = require("../models/order.ts")
//New Imports End

const router = express.Router()

module.exports = router;

const uri = process.env.mongoDbAtlasUri;

// Helper function to establish MongoDB connection and retrieve menu item by ID
async function getMenuItemById(collectionName, id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('jb-burritos');
    const collection = database.collection(collectionName);

    // Search by string type id
    const menuItem = await collection.findOne({ id: id });
    return menuItem;
  } finally {
    client.close();
  }
}


// Get by ID Method
router.get('/getOne/:collection/:id', async (req, res) => {
  const { collection, id } = req.params;
  try {
    const menuItem = await getMenuItemById(collection, id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:collection', async (req, res) => {
  const { collection } = req.params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('jb-burritos');
    const selectedCollection = database.collection(collection);

    const documents = await selectedCollection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});


//Post Method
// router.post('/post', (req, res) => {
//   res.send('Post API')
// })

// Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API CHAD')
  console.log('GET ALL API was called')
})

//Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//   res.send('Get by ID API')
// })

//Update by ID Method
// router.patch('/update/:id', (req, res) => {
//   res.send('Update by ID API')
// })

//Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//   res.send('Delete by ID API')
// })

//New Routes
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(' ')[1];
  console.log("VERIFY JWT CALLED");
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(401).json({
          isLoggedIn: false,
          message: "Failed to Authenticate"
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.status(401).json({ message: "No Token Provided", isLoggedIn: false });
  }
}

// Define your routes
router.post("/register", async (req, res) => {
  const user = req.body;

  // Check if user already exists or if the username or email is taken
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res.json({ message: "Username or email has already been taken" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      phonenumber: user.phonenumber,
      password: user.password
    });

    await dbUser.save();
    res.json({ message: "Success" });
  }
});

router.post("/login", (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ username: userLoggingIn.username })
    .then((dbUser) => {
      if (!dbUser) {
        return res.json({
          message: "Invalid Username or Password"
        });
      }

      bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
              username: dbUser.username,
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) return res.json({ message: err });
                return res.json({
                  message: "Success",
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.json({
              message: "Invalid Username or Password"
            });
          }
        });
    })
    .catch((err) => {
      return res.json({ message: err });
    });
});

//get username info
router.get('/getUsername/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Fetch orders associated with the provided username
    const userInfo = await User.find({ username });
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//New Routes End

router.post('/orders', async (req, res) => {
  const { orderID, phoneNumber, subtotal, tax, total, items, username, status } = req.body;

  try {
    // Create a new order document using the Mongoose model
    const order = new Order({
      orderID,
      phoneNumber,
      subtotal,
      tax,
      total,
      items,
      username,
      status
    });

    // Save the order document to the 'orders' collection
    await order.save();

    // Send a response back to the frontend
    res.status(201).json({ message: 'Order created successfully', orderId: order._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Fetch orders associated with the provided username
    const orders = await Order.find({ username });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

