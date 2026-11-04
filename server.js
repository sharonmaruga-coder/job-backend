const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/jobs', require('./routes/jobroutes'));
app.use('/api/applications', require('./routes/applicationroutes'));

app.get('/', (req, res) => {
  res.send('API is running and DB connected!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});