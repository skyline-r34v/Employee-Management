const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan')

//const ConnectDB = require('./models/DB.js')
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

//ConnectDB()
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


app.get('/', (req,res)=>{
    res.send("Server Started")
})

app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000/`)
});
