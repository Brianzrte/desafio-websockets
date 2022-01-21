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
const  chat = require('./data/chat');

//publics static files
app.use(express.static(path.resolve(__dirname, 'public')));

io.on('connection', socket => {
    console.log('Cliente conectado');
    socket.emit('regenerarProductos', productos);
    socket.emit('regenerarChat', chat);

    socket.on('incomingMessage', message => {
        if(message.email){
            chat.push(message);
            socket.emit('regenerarChat', chat);
        }
    });

    socket.on('finish-chat', () => {
        socket.emit('regenerarChat', chat);
    });

    socket.on('finish-productos', () => {
        socket.emit('regenerarProductos', productos);
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