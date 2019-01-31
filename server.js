// BRING IN EXPRESS, MONGOOSE and BODY-PARSER
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// BRING IN ITEMS API HANDLER
const items = require('./routes/api/items.js');

// INITIALIZE EXPRESS
const app = express();

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoURI;

// CONNECTION TO MONGODB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

app.use('/api/items', items);

app.get("/", (req, res, next, err) => {
  if(err.productCreateError) {
    return res.status(500).json({
      message:"Product creation failed."
    });
  }
  if(err.noNameForNewProduct) {
    return res.status(500).json({
      message:"Please, specify the name of a new product."
    });
  }
  if(err.serverErr) {
    return res.status(500).json({
      message:"Server error occured."
    });
  }
  if(err) {
    return res.status(500).json({
      message:err
    });
  }
})

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
