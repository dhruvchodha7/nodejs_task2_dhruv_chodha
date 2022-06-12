const app = require('./app');
const connectWithDB = require('./config/db');
require('dotenv').config();
const {PORT} = process.env;

//connext with DB
connectWithDB();

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
    
})
