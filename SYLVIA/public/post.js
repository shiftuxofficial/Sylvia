const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://prithwishchatterjee1277:pruth@cluster0.e2tnaao.mongodb.net/?retryWrites=true&w=majority'


// Database Name
const dbName = 'noor-web';

// Collection Name
const collectionName = 'noor';

// const { insertUser } = require('./userDb')


// const insertDetails = (req,res) => {
//     console.log(req.body);
//     const userDetails = req.body;
//     insertUser(userDetails);
//     res.send(200);
// }

// module.exports = {insertDetails};


// Sample data
// var data = {
//     name: "John",
//     age: 30,
//     city: "New York"
//   };




// // Convert data to JSON
// var jsonData = JSON.stringify(data);

// console.log(jsonData);


// app.post('/form.html', (req, res) => {
//     // 4. Convert HTML data to JSON (assuming it's in req.body)
//     const htmlData = req.body.html;
// })

// Sample JSON data
// const jsonData = {
//     val: document.getElementById("result").value,
    


//     // name: 'pal',
//     // age: 69,
//     // email: 'lul'
// };

async function insertData() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the database
        const db = client.db(dbName);

        // Get the collection
        const collection = db.collection(collectionName);

        // Insert JSON data into the collection
        const result = await collection.insertOne(jsonData);
        console.log(`Inserted ${result.insertedCount} document into the collection.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function to insert data
insertData();
