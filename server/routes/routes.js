const express = require('express');
const { MongoClient, ObjectId, Decimal128 } = require('mongodb'); // Import ObjectId from mongodb

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

    // Convert the id parameter to Decimal128 type
    const decimalId = Decimal128.fromString(id);

    // Search by Decimal128 type id
    const menuItem = await collection.findOne({ id: decimalId });
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
