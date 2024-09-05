const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const courseRoutes = require('./routes/Course');
const alumniRoutes = require('./routes/Alumni');
const placementRoutes = require('./routes/Placement');
const userRoutes = require('./routes/User');
const trainingRoutes = require('./routes/Training');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

//karmansingharora01
//YJ6XKm2vXjNc9Grf
mongoose.connect('mongodb+srv://karmansingharora01:YJ6XKm2vXjNc9Grf@cluster0.c0bjz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); 
  
  const db = mongoose.connection;
  

  db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB successfully');
  });

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/training', trainingRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
