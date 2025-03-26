const express = require('express');
const app = express();
const bosyParsr = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');
const port = process.env.PORT || 8089;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(bosyParsr.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


/** Insert data into MongoDB
 db.users.insertOne({
    name: 'Ranu Doe',
    email: 'Ranu@indeses.com',
    password:'123457',
    phones: [{
        mobile: '1234567894',
        type: 'Home'
    },
    {
        mobile: '1234567820',
        type: 'Office'
    }]
})
 */

/** Update Data in Mongo
  db.users.updateOne( {_id: ObjectId('67b59f0465ecc828f34d7942')},{
    $set:{"name":"Rahul Kumar"}
 
  })
 */

/** Delete Data in Mongo
db.users.deleteOne({_id: ObjectId('67b59f0465ecc828f34d7942')})
 */