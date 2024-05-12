const express = require('express')
const server = express()
const PORT = 3000

// Import routes
const userRoutes = require('./routes/userRoutes');
const showRoutes = require('./routes/showRoutes');

//----------------------- MIDDLE WARE ----------------------- //

//Middleware - app.use(express.json())
server.use(express.json());

//Middleware - urlEncoded - can have access to req.query
server.use(express.urlencoded({ extended: true }));


//----------------------- ROUTES ----------------------- //

// Use routes
server.use('/api/users', userRoutes);
server.use('/api/shows', showRoutes);

//define a port for express to listen to
server.listen(PORT, () => {
    console.log(`Our server is now listen to port ${PORT}`)
})