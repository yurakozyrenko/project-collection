import io from 'socket.io-client';

let socket = null;

export const initSocket = () => {
    if (!socket) {
        socket = io('https://project-collection-server.onrender.com');
        
        socket.on('connect', () => {
            console.log(`Socket connect server`);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnect from server`);
        });
    }
};

export const getSocket = () => socket;
