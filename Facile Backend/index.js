const express = require('express');
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

const db = require('./config/db.config.js');

app.get('/', (req, res) => {
    res.send('Welcome');
});

db.sequelize.sync({force: false})
    .then(() => {
        console.log('Sync Completed...');
    }
);

 require('./routes/user.route.js')(app);
 require('./routes/service.route.js')(app);
 require('./routes/rating.route.js')(app);
 require('./routes/department.route.js')(app);
 require('./routes/vendor.service.route.js')(app);
 require('./routes/job.route.js')(app);
 require('./routes/complaint.route.js')(app);
 require('./routes/cart.route.js')(app);

var port = process.env.PORT || 3005;

// Create Server
const server = app.listen(port, () => {
    console.log('Server is running on ', port);
});

cloudinary.config({ 
    cloud_name: 'facileapp', 
    api_key: '832115416232971', 
    api_secret: 'uMR6O2BSKJxZlejFI1W4VU_-ce4' 
  });