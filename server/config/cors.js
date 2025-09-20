const cors = require('cors');

module.exports = (app) => {
   
    const corsOptions = {
        origin: process.env.FRONT_URL, // Фронтенд-адрес
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization' // Для Bearer token
        ]  
    };

    app.use(cors(corsOptions));

};