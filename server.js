// BRING IN EXPRESS, MONGOOSE and BODY-PARSER
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//
const items = require('./routes/api/items.js');

// INITIALIZE EXPRESS
const app = express();

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoURI;

// CONNECTION TO MONGODB
mongoose
  .connect(db)
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.use('/api/items', items);


// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set a static folder
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}!`));
