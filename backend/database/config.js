const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/delice', { useUnifiedTopology: true,  useNewUrlParser: true});
mongoose.connection
        .once('open', ()=>console.log('Connected'))
        .on('error', (err)=>{
          console.log(`could not connect`, err);
        });

module.exports = mongoose;