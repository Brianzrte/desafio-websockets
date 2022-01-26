const express = require('express');
const rutaApi = require('./routers/app.routers');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const PORT = process.env.PORT || 8080;

//data
const  productos  = require('./data/productos');
const chats = require('./models/chat/chat.api');
const chat = new chats();


//publics static files
app.use(express.static(path.resolve(__dirname, 'public')));

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.emit('regenerarProductos', productos);
    socket.emit('regenerarChat', chat.getAll());
    
    socket.on('incomingMessage', (message) => {
        if(message.email){
            chat.save(message);
            socket.emit('enviarMensaje', message);
        }
    });
    
});

//rutas
app.use('/api', rutaApi);


app.get('/', (req, res) => {
    res.sendfile(path.resolve(__dirname, './public/index.html'));
})



httpserver.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})