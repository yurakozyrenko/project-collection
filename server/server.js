const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db.js');
const constants = require('./constants/const.js');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api', require('./routes/index'));

const PORT = process.env.PORT ?? 8000;

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log(constants.CONNECT_INFORMATION);
        await sequelize.sync();
        const server = app.listen(PORT, () =>
            console.log(constants.SERVER_START, `${PORT}`)
        );

        const { Server } = require('socket.io');
        const io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        io.on('connection', (socket) => {
            socket.on('new_comment', (data) => {
                console.log(data);
                io.emit('data', data);
            });
        });
        io.on('disconnect', () => {
            console.log('Disconnect');
        });
    } catch (e) {
        console.log(constants.UNCONNECT_INFORMATION, e);
    }
};

start();
