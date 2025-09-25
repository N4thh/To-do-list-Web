const express = require('express'); 

const app = express(); 

const PORT = process.env.PORT || 3000;  

app.use(express.json());

app.get('/', (req,res) =>
{ 
    res.json({
        message: 'Hello it me Nahh!', 
        timestamp: new Date().toISOString(), 
        service: 'Todo API'
    });
});

app.get('/health', (req,res) => {
    res.json({
        status: 'OK',
        service: 'Todo API',
        uptime: process.uptime() + 's'
    });
});

app.listen(PORT,'0.0.0.0', () =>{
    console.log(`Server is running at PORT ${PORT}`); 
    console.log(`Access to the website: http://localhost:${PORT}`); 
    console.log(`Check health: http://${PORT}/health`); 

});

