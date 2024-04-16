const {Server} = require("socket.io");


let io;
const init = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected " + socket.id);
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}
module.exports = {init,getIO};